import { Injectable, Logger } from '@nestjs/common'
import { NetworkCluster, NetworkResolver, NetworkToken } from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { getAnybodiesVaultSnapshot, getNetworkAssetInputMap, NetworkAssetInput } from '@pubkey-link/api-network-util'
import { LRUCache } from 'lru-cache'

import { ApiNetworkClusterService } from '../api-network-cluster.service'
import { ApiNetworkResolverSolanaNonFungibleService } from './api-network-resolver-solana-non-fungible.service'

@Injectable()
export class ApiNetworkResolverAnybodiesService {
  private readonly cacheAnybodiesAssets = new LRUCache<string, NetworkAssetInput[]>({
    max: 1000,
    ttl: 1000 * 60 * 60, // 1 hour
  })
  private readonly logger = new Logger(ApiNetworkResolverAnybodiesService.name)

  constructor(
    readonly core: ApiCoreService,
    readonly cluster: ApiNetworkClusterService,
    readonly solanaNonFungible: ApiNetworkResolverSolanaNonFungibleService,
  ) {}

  async resolve({
    cluster,
    owner,
    tokens,
  }: {
    cluster: NetworkCluster
    owner: string
    tokens: NetworkToken[]
  }): Promise<NetworkAssetInput[]> {
    if (!([NetworkCluster.SolanaMainnet] as NetworkCluster[]).includes(cluster)) {
      return []
    }
    this.logger.verbose(`resolveNetworkAssetAnybodies: Resolving assets for ${owner} on ${cluster}`)
    const assets: NetworkAssetInput[] = []
    for (const token of tokens) {
      if (!token.vault || !token.vault?.includes(':')) {
        throw new Error(`Invalid vault: ${token.vault}, expected format: <vaultId>:<address>`)
      }
      const vaultAssets = await this.getAnybodiesVaultWithAssets({ owner, token })
      if (!vaultAssets?.length) {
        this.logger.verbose(
          `resolveNetworkAssetAnybodies: No assets found for ${owner} on ${cluster} for vault: ${token.vault}`,
        )
        continue
      }
      this.logger.debug(`resolveNetworkAssetAnybodies: Found ${vaultAssets.length} assets for ${owner} on ${cluster}`)
      assets.push(...vaultAssets)
    }

    return assets
  }

  private async getAnybodiesVaultWithAssets({
    owner,
    token,
  }: {
    owner: string
    token: NetworkToken
  }): Promise<NetworkAssetInput[]> {
    return (
      // Fetch assets from cache
      this.fetchCachedAnybodiesAssets(token)
        // Filter assets by owner
        .then((assets) => assets.filter((asset) => asset.owner === owner))
    )
  }

  private async fetchCachedAnybodiesAssets(token: NetworkToken): Promise<NetworkAssetInput[]> {
    const cached = this.cacheAnybodiesAssets.has(token.id)

    if (!cached) {
      if (!token.vault || !token.vault?.includes(':')) {
        throw new Error(`Invalid vault: ${token.vault}, expected format: <vaultId>:<address>`)
      }
      this.logger.verbose(`[CACHE MISS] fetchCachedAnybodiesAssets: Fetching assets for ${token.id} ${token.vault}`)
      const [vault, account] = token.vault.split(':')
      const [assets, snapshot] = await Promise.all([
        this.solanaNonFungible.resolve({ owner: account, cluster: token.cluster, tokens: [token] }),
        getAnybodiesVaultSnapshot({ vault }),
      ])

      if (!assets.length || !snapshot?.length) {
        return []
      }

      const map = getNetworkAssetInputMap(assets)
      const merged = snapshot
        .filter((item) => map[item.account])
        .map(({ account, owner }) => ({
          // We merge the asset
          ...map[account],
          // We override the owner with the snapshot owner
          owner,
          resolver: NetworkResolver.Anybodies,
        }))

      this.cacheAnybodiesAssets.set(token.id, merged)
    }
    return this.cacheAnybodiesAssets.get(token.id) ?? []
  }
}
