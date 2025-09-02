import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { ApiCacheService } from '@pubkey-link/api-cache-data-access'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { CollectionAsset } from '@pubkey-link/sdk'
import { DAS } from 'helius-sdk'
import slugify from 'slugify'
import { UserCollectionCreateInput } from './dto/user-collection-create-input'
import { UserCollectionAssetFindManyInput, UserCollectionFindManyInput } from './dto/user-collection-find-many.input'
import { CollectionAssetAttribute } from './entity/collection-asset-attribute'
import { Collection } from './entity/collection.entity'

@Injectable()
export class ApiCollectionAssetService {
  constructor(private readonly core: ApiCoreService, private readonly cache: ApiCacheService) {}

  async findMany({
    collectionId,
    search,
    searchByOwnerWallet,
  }: UserCollectionAssetFindManyInput): Promise<CollectionAsset[]> {
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

      return assets.filter((asset) => {
        let matchesSearch = true
        let matchesOwner = true

        if (search?.length) {
          matchesSearch =
            asset.name.toLowerCase().includes(search.toLowerCase()) ||
            asset.description.toLowerCase().includes(search.toLowerCase())
        }

        if (searchByOwnerWallet?.length) {
          matchesOwner = asset.owner.toLowerCase() === searchByOwnerWallet.toLowerCase()
        }

        return matchesSearch && matchesOwner
      })
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
}

function renameAttributes(items: { trait_type: string; value: string }[] = []): CollectionAssetAttribute[] {
  return items.map((item) => ({
    key: item.trait_type,
    value: item.value,
  }))
}
