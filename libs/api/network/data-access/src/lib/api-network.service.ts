import { dasApi, DasApiAsset, DasApiAssetList } from '@metaplex-foundation/digital-asset-standard-api'
import { createUmi, publicKey, Umi } from '@metaplex-foundation/umi'
import { web3JsRpc } from '@metaplex-foundation/umi-rpc-web3js'
import { Injectable, Logger } from '@nestjs/common'
import { NetworkCluster, Prisma } from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { getAnybodiesVaultMap } from '@pubkey-link/api-network-util'
import { getTokenMetadata, TOKEN_2022_PROGRAM_ID, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { TokenMetadata } from '@solana/spl-token-metadata'
import { AccountInfo, Connection, ParsedAccountData, PublicKey } from '@solana/web3.js'
import { ChainId, Client, Token } from '@solflare-wallet/utl-sdk'
import { ApiAdminNetworkService } from './api-admin-network.service'
import { NetworkAsset } from './entity/network-asset.entity'

@Injectable()
export class ApiNetworkService {
  private readonly logger = new Logger(ApiNetworkService.name)
  private readonly connections: Map<NetworkCluster, Connection> = new Map()
  private readonly umis: Map<NetworkCluster, Umi> = new Map()
  private readonly tokenList: Map<NetworkCluster, Client> = new Map()
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
    return this.getConnection(cluster).then((conn) =>
      getTokenMetadata(conn, new PublicKey(account)).then((res) => (res ? (res as TokenMetadata) : null)),
    )
  }

  async getAllTokenMetadata({ cluster, account }: { cluster: NetworkCluster; account: string }) {
    const asset = await this.getAsset({ cluster: cluster, account: account })

    let metadata: TokenMetadata | null = null
    try {
      metadata = await this.getTokenMetadata({ cluster: cluster, account: account })
    } catch (e) {
      this.logger.verbose(`Failed to fetch token metadata for ${account}`)
    }

    let tokenList: Token | null = null
    try {
      tokenList = await this.getTokenList(cluster).then((res) => res.fetchMint(new PublicKey(account)))
    } catch (e) {
      this.logger.verbose(`Failed to fetch token list for ${account}`)
    }

    if (!asset && !metadata && !tokenList) {
      throw new Error(`Asset or metadata for ${account} not found on cluster ${cluster}`)
    }

    const imageUrl = metadata?.uri
      ? await fetch(metadata?.uri)
          .then((res) => res.json())
          .then((res) => res.image)
          .catch((err) => {
            this.logger.warn(`Failed to fetch image for ${metadata?.uri}`, err)
            return asset.content.files?.length ? asset.content.files[0].uri : null
          })
      : null

    return {
      name: metadata?.name ?? asset?.content?.metadata?.name ?? tokenList?.name,
      imageUrl: imageUrl ?? tokenList?.logoURI,
      metadataUrl: metadata?.uri ?? asset.content.json_uri,
      description: asset.content.metadata.description,
      symbol: metadata?.symbol ?? asset?.content?.metadata?.symbol ?? tokenList?.symbol,
      raw: { asset, metadata } as unknown as Prisma.InputJsonValue,
    }
  }

  async getTokenAccounts({ cluster, account }: { cluster: NetworkCluster; account: string }) {
    const address = new PublicKey(account)
    return this.getConnection(cluster).then((conn) =>
      Promise.all([
        conn.getTokenAccountsByOwner(address, { programId: TOKEN_PROGRAM_ID }).then((res) => res.value ?? []),
        conn.getTokenAccountsByOwner(address, { programId: TOKEN_2022_PROGRAM_ID }).then((res) => res.value ?? []),
      ])
        .then(([tokenAccounts, token2022Accounts]) => [...tokenAccounts, ...token2022Accounts])
        .then((accounts) =>
          accounts
            .map((account) => ({
              account: account.pubkey.toBase58(),
              programId: account.account.owner.toBase58(),
            }))
            .sort((a, b) => a.account.localeCompare(b.account)),
        )
        .then((sorted) =>
          sorted.reduce(
            (acc, curr) => ({
              ...acc,
              [curr.programId]: [...(acc[curr.programId] || []), curr.account],
            }),
            {} as Record<string, string[]>,
          ),
        ),
    )
  }

  //  "7j67eWNT9R6iGkg1MP6oHntv9Vo4zSwCeKY9GZTPo79w",
  //       "8C2NHZPDb4C7t5n3SZHXRjcfCQVAYAN9ynqgk47MrEs",
  //       "AgcALrgjGhjmEWGEuvwkJk8Ti9BKSYdG2ZEpsaZaBUQV",
  //       "CMCVKpGc3yAmSGXTuyYHcFesRhArSGhrWwuTc7q3wEX1"
  //
  // "9ojN19VvToGRvS9fDhDKqrmCvyY2V7yYYTSB714DcUde",
  // "9YgGKJhKsNZNJCbTgkycuXJLK2Wcc23bbETpyKY9FFeD",
  // "AaFdz1NKXKuNZJLbfMP3YAfSVT8ricq7uYKUoaS5pyko"
  //     "2gsip17gKrakhCfkK3EFQpYRA5fK8uYBdqJjXdju4ffW",
  //       "6DyjGURjGg8i32pFJDRMgCUDVrN5jWGPHvHFdDbkAXMx",
  //       "FCC35WtadGHRuyC2ExJBNy2WJrCWRiRDwt7bUdcEUn5v",
  //       "FnwwSj7ybiUrmQ2Eui9REC4Up1ygXNdT6oHNrP2LxVuR",
  //       "GRHQ1uoFfY7ek5YPpUX3LunTTwoV7C3rbKUPNfHyw3vH"

  async getAsset({ cluster, account }: { cluster: NetworkCluster; account: string }) {
    return this.getUmi(cluster).then((res) => res.rpc.getAsset(publicKey(account)))
  }

  async resolveSolanaNonFungibleAsset({
    account,
    cluster,
    owner,
  }: {
    account: string
    cluster: NetworkCluster
    owner: string
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
    const connection = this.connections.get(cluster)
    if (!connection) {
      throw new Error(`getConnection: Error getting network for cluster: ${cluster}`)
    }
    return connection
  }

  private async getTokenList(cluster: NetworkCluster) {
    if (!this.tokenList.has(cluster)) {
      const connection = await this.getConnection(cluster)
      const chainId = getChainId(cluster)
      this.tokenList.set(
        cluster,
        new Client({
          connection,
          chainId,
          apiUrl: 'https://token-list-api.solana.cloud',
          cdnUrl: 'https://cdn.jsdelivr.net/gh/solflare-wallet/token-list/solana-tokenlist.json',
          metaplexTimeout: 2000,
          timeout: 2000,
        }),
      )
      this.logger.verbose(`getConnection: Network created for cluster: ${cluster}`)
    }
    const connection = this.tokenList.get(cluster)
    if (!connection) {
      throw new Error(`getConnection: Error getting network for cluster: ${cluster}`)
    }
    return connection
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

function getChainId(cluster: NetworkCluster): ChainId {
  switch (cluster) {
    case NetworkCluster.SolanaMainnet:
      return ChainId.MAINNET
    case NetworkCluster.SolanaDevnet:
      return ChainId.DEVNET
    case NetworkCluster.SolanaTestnet:
      return ChainId.TESTNET
    default:
      throw new Error(`getChainId: ChainId not found for cluster: ${cluster}`)
  }
}
