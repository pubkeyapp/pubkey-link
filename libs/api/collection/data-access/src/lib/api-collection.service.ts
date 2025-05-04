import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { ApiCacheService } from '@pubkey-link/api-cache-data-access'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { CollectionAsset } from '@pubkey-link/sdk'
import { DAS } from 'helius-sdk'
import slugify from 'slugify'
import { UserCollectionCreateInput } from './dto/user-collection-create-input'
import { UserCollectionFindManyInput } from './dto/user-collection-find-many.input'
import { CollectionAssetAttribute } from './entity/collection-asset-attribute'
import { Collection } from './entity/collection.entity'

@Injectable()
export class ApiCollectionService {
  private readonly logger = new Logger(ApiCollectionService.name)
  constructor(private readonly core: ApiCoreService, private readonly cache: ApiCacheService) {}

  async findMany(input: UserCollectionFindManyInput): Promise<Collection[]> {
    const community = await this.core.data.community.findUnique({ where: { id: input.communityId } })
    if (!community) {
      throw new Error(`Community ${input.communityId} not found`)
    }
    const collections = await this.core.data.collection.findMany({
      where: { communityId: community.id },
      include: { token: true },
    })

    return collections.length ? collections : []
  }

  async findOne(collectionId: string) {
    const collection = await this.ensureCollection(collectionId)
    if (!collection.token) {
      throw new Error(`Token for collection ${collection.slug} not found`)
    }
    const resolver = this.cache.createTokenResolver(collection.token)
    if (!resolver) {
      throw new Error(`Resolver ${collection.token.account} not found`)
    }

    try {
      const snapshot = await this.cache.assetsSnapshot({ cluster: collection.token.cluster, id: resolver.id })
      const items: DAS.GetAssetResponse[] = (snapshot.items ?? []) as DAS.GetAssetResponse[]

      const assets = items.map((asset) => ({
        id: asset.id,
        name: asset.content?.metadata?.name ?? '',
        description: asset.content?.metadata?.description ?? '',
        imageUrl: asset.content?.files?.[0]?.uri ?? '',
        owner: asset.ownership.owner,
        attributes: renameAttributes(asset.content?.metadata?.attributes ?? []),
      }))

      return {
        ...collection,
        attributes: accumulateAttributes(assets),
        assets,
      }
    } catch (e) {
      console.log('error', e)
      throw e
    }
  }

  private async ensureCollection(collectionId: string) {
    const found = await this.core.data.collection.findUnique({
      where: { id: collectionId },
      include: { token: true },
    })
    if (!found) {
      throw new Error(`Collection ${collectionId} not found`)
    }
    return found
  }

  async createCollection(userId: string, input: UserCollectionCreateInput) {
    await this.core.ensureCommunityAdmin({ communityId: input.communityId, userId })
    const found = await this.core.data.collection.findFirst({
      where: { communityId: input.communityId, tokenId: input.tokenId },
    })
    if (found) {
      throw new Error(`Collection ${input.tokenId} already exists in community ${input.communityId}`)
    }
    const token = await this.core.data.networkToken.findFirst({ where: { id: input.tokenId } })
    if (!token) {
      throw new Error(`Token ${input.tokenId} not found`)
    }
    try {
      const collection = await this.core.data.collection.create({
        data: {
          slug: slugify(token.name).toLowerCase(),
          name: token.name,
          description: token.description,
          imageUrl: token.imageUrl,
          communityId: input.communityId,
          tokenId: input.tokenId,
        },
        include: { community: true, token: true },
      })
      this.logger.verbose(
        `Created collection ${collection.slug} for token ${token.name} in community ${input.communityId}`,
      )
      return collection
    } catch (error) {
      this.logger.error(`Error creating collection for token ${token.name} in community ${input.communityId}`, error)
      throw new BadRequestException('Error creating collection')
    }
  }

  async deleteCollection(userId: string, collectionId: string) {
    const collection = await this.ensureCollection(collectionId)
    await this.core.ensureCommunityAdmin({ communityId: collection.communityId, userId })
    try {
      await this.core.data.collection.delete({ where: { id: collection.id } })
      this.logger.verbose(
        `Deleted collection ${collection.slug} for token ${collection.token.name} in community ${collection.communityId}`,
      )
      return collection
    } catch (error) {
      this.logger.error(
        `Error deleting collection for token ${collection.token.name} in community ${collection.communityId}`,
        error,
      )
      throw new BadRequestException('Error deleting collection')
    }
  }
}

function renameAttributes(items: { trait_type: string; value: string }[] = []): CollectionAssetAttribute[] {
  return items.map((item) => ({
    key: item.trait_type,
    value: item.value,
  }))
}

function accumulateAttributes(assets: CollectionAsset[]): CollectionAssetAttribute[] {
  const counts = assets.reduce((map, asset) => {
    const attrs = asset.attributes ?? []
    if (!attrs.length) {
      return map
    }
    attrs.reduce((m, attr) => {
      const mapKey = `${attr.key}:${attr.value}`
      m.set(mapKey, (m.get(mapKey) || 0) + 1)
      return m
    }, map)
    return map
  }, new Map<string, number>())

  return Array.from(counts, ([keyValue, count]) => {
    const [key, value] = keyValue.split(':')
    return { key, value, count }
  }).sort((a, b) => b.count - a.count)
}
