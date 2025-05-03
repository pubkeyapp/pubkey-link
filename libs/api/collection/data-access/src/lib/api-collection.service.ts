import { Injectable } from '@nestjs/common'
import { NetworkTokenType } from '@prisma/client'
import { ApiCacheService } from '@pubkey-link/api-cache-data-access'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { CollectionAsset } from '@pubkey-link/sdk'
import { DAS } from 'helius-sdk'
import { Collection, CollectionAssetAttribute } from './entity/collection.entity'

@Injectable()
export class ApiCollectionService {
  constructor(private readonly core: ApiCoreService, private readonly cache: ApiCacheService) {}

  async findMany(): Promise<Collection[]> {
    const tokens = await this.core.data.networkToken.findMany({
      where: { featured: true, type: NetworkTokenType.NonFungible },
    })
    if (!tokens.length) {
      return []
    }

    return tokens.map((token) => {
      return {
        id: token.account,
        name: token.name,
        description: token.description ?? '',
        imageUrl: token.imageUrl ?? '',
      }
    })
  }

  async findOne(collectionId: string) {
    const collection = await this.ensureCollection(collectionId)
    const token = await this.core.data.networkToken.findFirst({ where: { account: collection.id } })
    if (!token) {
      throw new Error(`Token ${collection.id} not found`)
    }
    const resolver = this.cache.createTokenResolver(token)
    if (!resolver) {
      throw new Error(`Resolver ${token.account} not found`)
    }

    const snapshot = await this.cache.assetsSnapshot({ cluster: token.cluster, id: resolver.id })
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
      id: collection.id,
      name: collection.name,
      description: collection.description ?? '',
      imageUrl: collection.imageUrl ?? '',
      attributes: accumulateAttributes(assets),
      assets,
    }
  }

  private async ensureCollection(collectionId: string) {
    const collections = await this.findMany()
    const found = collections.find((c) => c.id === collectionId)
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
