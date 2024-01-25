import { dasApi, DasApiAsset, DasApiAssetList } from '@metaplex-foundation/digital-asset-standard-api'
import { createUmi, publicKey, Umi } from '@metaplex-foundation/umi'
import { web3JsRpc } from '@metaplex-foundation/umi-rpc-web3js'
import { Injectable, Logger } from '@nestjs/common'
import { NetworkCluster } from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { getAnybodiesVaultMap } from '@pubkey-link/api-network-util'
import { getTokenMetadata } from '@solana/spl-token'
import { AccountInfo, Connection, ParsedAccountData, PublicKey } from '@solana/web3.js'
import { ApiAdminNetworkService } from './api-admin-network.service'
import { NetworkAsset } from './entity/network-asset.entity'

@Injectable()
export class ApiNetworkService {
  private readonly logger = new Logger(ApiNetworkService.name)
  private readonly connections: Map<NetworkCluster, Connection> = new Map()
  private readonly umis: Map<NetworkCluster, Umi> = new Map()
  constructor(readonly admin: ApiAdminNetworkService, readonly core: ApiCoreService) {}

  async resolveAnybodiesAsset({ owner, vaultId }: { owner: string; vaultId: string }): Promise<NetworkAsset> {
    return getAnybodiesVaultMap({ vaultId })
      .then((map) => map.find((item) => item.owner === owner)?.accounts ?? [])
      .then((accounts) => ({ owner, accounts, amount: `${accounts.length}` }))
  }

  async getAccountInfo({ cluster, account }: { cluster: NetworkCluster; account: string }) {
    return this.getConnection(cluster).then((conn) =>
      conn.getParsedAccountInfo(new PublicKey(account)).then((res) => res.value as AccountInfo<ParsedAccountData>),
    )
  }
  async getTokenMetadata({ cluster, account }: { cluster: NetworkCluster; account: string }) {
    return this.getConnection(cluster).then((conn) => getTokenMetadata(conn, new PublicKey(account)).then((res) => res))
  }

  async getAsset({ cluster, account }: { cluster: NetworkCluster; account: string }) {
    return this.getUmi(cluster).then((res) => res.rpc.getAsset(publicKey(account)))
  }

  async resolveSolanaNonFungibleAsset({
    account,
    cluster,
    owner,
  }: {
    owner: string
    cluster: NetworkCluster
    account: string
  }) {
    return this.getAllAssetsByOwner({ owner, cluster, groups: account })
      .then((assets) => assets.items?.map((item) => item.id?.toString()) ?? [])
      .then((accounts) => ({ owner, accounts, amount: `${accounts.length}` }))
  }

  async resolveSolanaFungibleAsset({
    account,
    cluster,
    owner,
  }: {
    owner: string
    cluster: NetworkCluster
    account: string
  }) {
    console.log('getSolanaTokenAmount', { cluster, account, owner })
    const accounts: string[] = []

    return { owner, accounts, amount: `${accounts.length}` }
  }

  private async getAllAssetsByOwner({
    owner,
    cluster,
    groups,
  }: {
    owner: string
    cluster: NetworkCluster
    groups?: string
  }) {
    const tag = `getAllAssetsByOwner(${owner}, ${cluster}, ${groups})`
    const umi = await this.getUmi(cluster)

    // Create a response list similar to the one returned by the API
    const list: DasApiAssetList = { total: 0, items: [], limit: 1000, page: 1 }
    let page = 1

    // Loop through all pages of assets
    while (list.total < page * list.limit) {
      const assets = await umi.rpc.getAssetsByOwner({
        owner: publicKey(owner),
        limit: list.limit,
        page,
      })
      this.logger.verbose(`${tag} - page ${page} - ${assets.items.length} assets`)
      if (assets.items.length === 0) {
        break
      }
      list.items.push(...assets.items)
      list.total += assets.total
      page++
    }

    // Filter the assets by group
    const items = list?.items ? findAssetsByGroup(list?.items, groups) : []

    // Return the list with the page offset by 1
    return { ...list, page: page - 1, items }
  }

  private async getConnection(cluster: NetworkCluster) {
    if (!this.connections.has(cluster)) {
      const network = await this.core.data.network.findUnique({ where: { cluster } })
      if (!network) {
        throw new Error(`getConnection: Network not found for cluster: ${cluster}`)
      }
      this.connections.set(cluster, new Connection(network.endpoint, 'confirmed'))
      this.logger.verbose(`getConnection: Network created for cluster: ${cluster}`)
    }
    const umi = this.connections.get(cluster)
    if (!umi) {
      throw new Error(`getConnection: Error getting network for cluster: ${cluster}`)
    }
    return umi
  }

  private async getUmi(cluster: NetworkCluster) {
    if (!this.umis.has(cluster)) {
      const network = await this.core.data.network.findUnique({ where: { cluster } })
      if (!network) {
        throw new Error(`getUmi: Network not found for cluster: ${cluster}`)
      }
      this.umis.set(cluster, createUmi().use(web3JsRpc(network.endpoint, 'confirmed')).use(dasApi()))
      this.logger.verbose(`getUmi: Network created for cluster: ${cluster}`)
    }
    const umi = this.umis.get(cluster)
    if (!umi) {
      throw new Error(`getUmi: Error getting network for cluster: ${cluster}`)
    }
    return umi
  }
}
/**
 * Find the collection group value for the asset
 * @param asset DasApiAsset Asset to find the collection group value for
 */
export function findAssetGroupValue(asset: DasApiAsset) {
  return asset.grouping?.find((g) => g.group_key === 'collection')?.group_value
}

/**
 * Filter assets by optional list of collections (comma separated)
 * @param items DasApiAsset[] List of assets to filter
 * @param groups string Optional list of groups (comma separated)
 */
export function findAssetsByGroup(items: DasApiAsset[], groups?: string) {
  return items.filter((item) => !groups || groups.split(',').includes(findAssetGroupValue(item) ?? ''))
}
