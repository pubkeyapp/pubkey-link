import { Injectable, Logger } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { NetworkCluster, NetworkToken, NetworkTokenType, Prisma } from '@prisma/client'
import {
  createResolver,
  getResolverOwner,
  Resolver,
  resolverHeliusCollectionAssets,
  resolverHeliusTokenAccounts,
  ResolverType,
} from '@pubkey-cache/resolver'
import { ApiCacheConfigService, EVENT_CACHE_CONFIG_LOADED } from '@pubkey-link/api-cache-config-data-access'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { ApiNetworkAssetService } from '@pubkey-link/api-network-asset-data-access'
import { ApiNetworkTokenService } from '@pubkey-link/api-network-token-data-access'
import { DAS, Helius } from 'helius-sdk'
import { Storage } from 'unstorage'
import { ApiCache } from './api-cache'
import { createTraitCountMap, sortAssetsByName, TraitCountMap } from './create-trait-count-map'
import { CacheStatus } from './entity/cache-status'
import { getStorage } from './get-storage'
import { formatSnapshot } from './helpers/format-snapshot'

export interface CachedResult {
  cluster: NetworkCluster
  id: string
  cachedAt: Date
  type: ResolverType
  total: number
  traits?: TraitCountMap
  items: (DAS.GetAssetResponse | DAS.TokenAccounts)[]
}

export async function getResult({
  resolver,
  storage,
}: {
  resolver: Resolver
  storage: Storage
}): Promise<CachedResult | null> {
  return await storage.get<CachedResult>(resolver.id)
}

export async function storeResult({ storage, path, result }: { path: string; result: CachedResult; storage: Storage }) {
  let writeCount = 0
  // Store the result in the storage snapshot with an expiration of 1 hour
  await storage.set(path, JSON.stringify(result), { ttl: 3600 })
  writeCount++

  return { writeCount }
}

@Injectable()
export class ApiCacheService {
  private readonly caches: ApiCache[] = []
  private readonly logger = new Logger(ApiCacheService.name)
  private readonly storage: Storage

  constructor(
    private readonly core: ApiCoreService,
    private readonly cacheConfig: ApiCacheConfigService,
    private readonly networkAsset: ApiNetworkAssetService,
    private readonly networkToken: ApiNetworkTokenService,
  ) {
    this.storage = getStorage({ redisUrl: this.core.config.redisUrl })
  }

  get restEnabled() {
    return this.cacheConfig.restEnabled
  }

  get status(): CacheStatus {
    return {
      caches: Object.values(this.caches).map((c) => ({
        cluster: c.cluster,
        resolvers: c.resolvers,
      })),
    }
  }

  @OnEvent(EVENT_CACHE_CONFIG_LOADED)
  async onCacheConfigLoaded() {
    if (!this.core.config.featureCacheEnabled) {
      this.logger.warn('Cache is disabled')
      return
    }
    const tokens = await this.networkToken.data.findCacheNetworkTokens()
    if (!tokens.length) {
      this.logger.warn('No network tokens found with cache enabled')
      return
    }
    this.logger.verbose(`Network tokens found with cache enabled ${tokens.length}`)

    if (!this.caches.length) {
      await this.loadCaches(tokens)
    }
    await this.core.scheduleJob('cache::resolve-all', this.cacheConfig.cronExpression, async () => {
      await this.resolveAllCaches()
    })
  }

  async loadCaches(tokens: NetworkToken[]) {
    const clusters = new Set(tokens.map((token) => token.cluster))
    this.logger.verbose(`[loadCaches] Clusters found: ${[...clusters].join(', ')}`)

    for (const cluster of clusters) {
      try {
        const resolvers: Resolver[] = []
        for (const token of tokens.filter((token) => token.cluster === cluster)) {
          const resolver = this.createTokenResolver(token)
          if (!resolver) {
            this.logger.warn(`[loadCaches] [${cluster}] No resolver found for token ${token.type} ${token.account}`)
            continue
          }
          resolvers.push(resolver)
        }
        if (!resolvers.length) {
          this.logger.warn(`[loadCaches] [${cluster}] No resolvers found`)
          continue
        }
        const cache = new ApiCache({
          cluster,
          resolvers,
          storage: this.storage,
          context: { helius: this.getHelius(cluster) },
        })
        this.caches.push(cache)
      } catch (error) {
        this.logger.error(`[loadCaches] [${cluster}] Error loading cache: ${error}`)
      }
    }
    this.logger.verbose(`[loadCaches] Caches configured: ${this.caches.map((c) => c.cluster).join(', ')}`)
  }

  createTokenResolver(token: NetworkToken) {
    if (token.type === NetworkTokenType.NonFungible) {
      return createResolver(ResolverType['helius-collection-assets'], token.account)
    }
    if (token.type === NetworkTokenType.Fungible) {
      return createResolver(ResolverType['helius-token-accounts'], token.account)
    }
    return null
  }

  private getHelius(cluster: NetworkCluster) {
    if (!this.cacheConfig.heliusApiKey.length) {
      throw new Error('No cache context helius api key found')
    }
    if (cluster !== NetworkCluster.SolanaDevnet && cluster !== NetworkCluster.SolanaMainnet) {
      throw new Error(`Helius is not available for cluster: ${cluster}`)
    }
    return new Helius(
      this.cacheConfig.heliusApiKey,
      cluster === NetworkCluster.SolanaMainnet ? 'mainnet-beta' : 'devnet',
    )
  }

  async resolveCache(param: { cluster: NetworkCluster; id: string }) {
    const { cache, resolver } = await this.getResolver(param)

    if (
      resolver.type !== ResolverType['helius-collection-assets'] &&
      resolver.type !== ResolverType['helius-token-accounts']
    ) {
      throw new Error(`Unknown resolver type: ${resolver.type}`)
    }

    const result: CachedResult = await this.resolve(param.cluster, resolver)

    const { writeCount } = await storeResult({
      path: resolver.id,
      result,
      storage: cache.storage,
    })
    this.logger.verbose(`Synced resolver ${resolver.id}, wrote ${writeCount} items to storage`)
    return [null, `Synced resolver ${resolver.id}, wrote ${writeCount} items to storage`]
  }

  async resolveAllCaches() {
    this.logger.verbose(`resolveAllCaches: Starting`)
    const results: string[] = []

    for (const cache of this.caches) {
      const startTime = new Date().getTime()
      for (const resolver of cache.resolvers) {
        const startTimeResolver = new Date().getTime()
        const result = await this.resolve(cache.cluster, resolver)

        const { writeCount } = await storeResult({
          path: resolver.id,
          result,
          storage: cache.storage,
        })
        await this.syncCacheNetworkAssets({ cluster: cache.cluster, id: resolver.id })

        const endTimeResolver = new Date().getTime()
        const durationResolver = endTimeResolver - startTimeResolver
        results.push(
          `Synced resolver ${resolver.id}, wrote ${writeCount} items to storage (${durationResolver / 1000} seconds)`,
        )
      }

      const endTime = new Date().getTime()
      const duration = endTime - startTime
      results.push(`Duration ${duration / 1000} seconds`)
      this.logger.verbose(`resolveAllCaches: Completed (${duration / 1000} seconds)`)
    }

    this.logger.verbose(`resolveAllCaches: Completed, ${results.length} cache(s) resolved`)
    return results
  }

  async assetsOwner(param: { cluster: NetworkCluster; id: string; owner: string }) {
    const { cache, resolver } = await this.getResolver(param)
    const owner = param.owner
    if (!owner) {
      return { error: 'Missing owner' }
    }

    const result = await getResolverOwner({ owner, resolver, storage: cache.storage })

    return result ? result : { error: 'No owner found' }
  }

  async assetsSnapshot(param: { cluster: NetworkCluster; id: string }) {
    try {
      return await this.getSnapshot(param)
    } catch (e) {
      this.logger.error(`Error getting snapshot for ${param.id}`, e)
      throw e
    }
  }

  private async getSnapshot(param: { cluster: NetworkCluster; id: string }): Promise<CachedResult> {
    const { cache, resolver } = await this.getResolver(param)
    const result = await getResult({ resolver, storage: cache.storage })
    if (!result) {
      throw new Error('No result found')
    }

    const cachedAt = result?.cachedAt ? new Date(result.cachedAt) : new Date()
    return {
      ...result,
      cluster: param.cluster,
      cachedAt,
    }
  }

  private async getResolver(param: { cluster: NetworkCluster; id: string }) {
    const cache = this.caches.find((c) => c.cluster === param.cluster)
    if (!cache) {
      throw new Error(`Cache not found for cluster: ${param.cluster}`)
    }
    const resolver = cache.resolvers.find((r) => r.id === param.id)
    if (!resolver) {
      throw new Error(`Resolver not found for id: ${param.id}`)
    }

    return { resolver, cache }
  }

  private async resolve(cluster: NetworkCluster, resolver: Resolver): Promise<CachedResult> {
    switch (resolver.type) {
      case ResolverType['helius-collection-assets']:
        return await resolverHeliusCollectionAssets({
          collection: resolver.address,
          helius: this.getHelius(cluster),
          verbose: true,
        }).then((res) => ({
          cluster,
          cachedAt: new Date(),
          id: resolver.id,
          type: resolver.type,
          total: res.total,
          traits: createTraitCountMap(res.items),
          items: sortAssetsByName(res.items),
        }))
      case ResolverType['helius-token-accounts']:
        return await resolverHeliusTokenAccounts({
          helius: this.getHelius(cluster),
          mint: resolver.address,
          verbose: true,
        }).then((res) => ({
          cluster,
          cachedAt: new Date(),
          id: resolver.id,
          type: resolver.type,
          total: res.total,
          items: res.items,
        }))
      default:
        throw new Error(`Unknown resolver type: ${resolver.type}`)
    }
  }

  async syncCacheNetworkAssets(param: { cluster: NetworkCluster; id: string }) {
    const snapshot = await this.getSnapshot({ cluster: param.cluster, id: param.id })
    if (!snapshot) {
      throw new Error(`Snapshot not found for ${param.id}`)
    }
    const networkToken = await this.getSnapshotNetworkToken(snapshot)
    const assets: Prisma.NetworkAssetCreateInput[] = formatSnapshot({
      items: snapshot.items,
      networkToken,
      type: snapshot.type,
    })
    if (assets.length) {
      this.logger.verbose(`syncCache: Upserting ${assets.length} assets`)
      await this.networkAsset.sync.upsertAssets({ cluster: snapshot.cluster, assets, linkIdentity: false })
    }
    return {
      total: snapshot.total,
      items: snapshot.items,
    }
  }

  private async getSnapshotNetworkToken(snapshot: CachedResult): Promise<NetworkToken> {
    const account = snapshot.id?.split(':')[1]
    const found = await this.core.data.networkToken.findFirst({ where: { account, cluster: snapshot.cluster } })
    if (!found) {
      throw new Error(`getSnapshotToken: Token ${account} not found on cluster ${snapshot.cluster}`)
    }
    return found
  }
}
