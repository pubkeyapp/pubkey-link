import { dasApi, DasApiAsset, DasApiAssetList } from '@metaplex-foundation/digital-asset-standard-api'
import { createUmi, publicKey, Umi } from '@metaplex-foundation/umi'
import { web3JsRpc } from '@metaplex-foundation/umi-rpc-web3js'
import { Injectable, Logger } from '@nestjs/common'
import { NetworkCluster, NetworkToken, NetworkTokenType, Prisma } from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { AnybodiesVaultSnapshot, getAnybodiesVaultMap, getAnybodiesVaultSnapshot } from '@pubkey-link/api-network-util'
import { getTokenMetadata, TOKEN_2022_PROGRAM_ID, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { TokenMetadata } from '@solana/spl-token-metadata'
import { AccountInfo, Connection, ParsedAccountData, PublicKey } from '@solana/web3.js'
import { ChainId, Client, Token } from '@solflare-wallet/utl-sdk'
import { LRUCache } from 'lru-cache'
import { ApiAdminNetworkService } from './api-admin-network.service'
import { SolanaNetworkAsset } from './entity/solana-network-asset.entity'

@Injectable()
export class ApiNetworkService {
  private readonly cacheAnybodiesVaults = new LRUCache<string, AnybodiesVaultSnapshot>({
    max: 1000,
    ttl: 1000 * 60 * 60, // 1 hour
    fetchMethod: async (vaultId) => {
      this.logger.verbose(`cacheAnybodiesVaults: Cache miss for ${vaultId}`)
      return getAnybodiesVaultSnapshot({ vaultId })
    },
  })

  private readonly solanaNetworkAssetsCache = new LRUCache<string, SolanaNetworkAsset[]>({
    max: 1000,
    ttl: 1000 * 60 * 60, // 1 hour
  })

  private readonly logger = new Logger(ApiNetworkService.name)
  private readonly connections: Map<NetworkCluster, Connection> = new Map()
  private readonly umis: Map<NetworkCluster, Umi> = new Map()
  private readonly tokenList: Map<NetworkCluster, Client> = new Map()
  constructor(readonly admin: ApiAdminNetworkService, readonly core: ApiCoreService) {}

  async resolveAnybodiesAsset({ owner, vaultId }: { owner: string; vaultId: string }): Promise<SolanaNetworkAsset> {
    return getAnybodiesVaultMap({ vaultId })
      .then((map) => map.find((item) => item.owner === owner)?.accounts ?? [])
      .then((accounts) => ({ owner, accounts, amount: `${accounts.length}` }))
  }

  async resolveAnybodiesAssets({
    owners,
    vaultId,
  }: {
    owners: string[]
    vaultId: string
  }): Promise<SolanaNetworkAsset[]> {
    const snapshot: AnybodiesVaultSnapshot = await this.getCachedAnybodiesVaultSnapshot({ vaultId }).then((snapshot) =>
      snapshot.filter((item) => owners.includes(item.owner)),
    )

    const ownerMap: Record<string, SolanaNetworkAsset> = snapshot.reduce((acc, curr) => {
      const asset = acc[curr.owner] ?? { owner: curr.owner, accounts: [], amount: '0' }
      return {
        ...acc,
        [curr.owner]: {
          ...asset,
          accounts: [...asset.accounts, curr.account],
          amount: `${asset.accounts.length + 1}`,
          group: `vault:${vaultId}`,
        },
      }
    }, {} as Record<string, SolanaNetworkAsset>)

    return Object.values(ownerMap)
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

  async getAsset({ cluster, account }: { cluster: NetworkCluster; account: string }) {
    return this.getUmi(cluster).then((res) => res.rpc.getAsset(publicKey(account)))
  }

  async resolveSolanaNonFungibleAssetXX({
    groups,
    cluster,
    owner,
  }: {
    groups: string[]
    cluster: NetworkCluster
    owner: string
  }): Promise<SolanaNetworkAsset> {
    return this.getAllAssetsByOwner({ owner, cluster, groups })
      .then((assets) => assets.items?.map((item) => item.id?.toString()) ?? [])
      .then((accounts) => ({ owner, accounts, amount: `${accounts.length}` }))
  }

  async resolveSolanaFungibleAssetsForOwner({
    cluster,
    mint,
    program,
    owner,
  }: {
    cluster: NetworkCluster
    owner: string
    program: string
    mint: string
  }): Promise<SolanaNetworkAsset[]> {
    return this.getConnection(cluster)
      .then((conn) =>
        conn.getParsedTokenAccountsByOwner(new PublicKey(owner), {
          mint: new PublicKey(mint),
          programId: new PublicKey(program),
        }),
      )
      .then((res) => {
        const assets: SolanaNetworkAsset[] = []
        const accounts = res.value ?? []

        for (const account of accounts) {
          const asset: SolanaNetworkAsset = {
            group: mint,
            owner,
            accounts: [account.pubkey.toBase58()],
            amount: account.account.data.parsed.info.tokenAmount.uiAmount,
          }
          assets.push(asset)
        }

        return assets
      })
  }

  async resolveSolanaFungibleAssets({
    cluster,
    tokens,
    owner,
  }: {
    cluster: NetworkCluster
    owner: string
    tokens: NetworkToken[]
  }): Promise<Prisma.NetworkAssetCreateInput[]> {
    const address = new PublicKey(owner)
    const mints = tokens.map((token) => token.account)
    const tokenMap = tokens.reduce(
      (acc, curr) => ({ ...acc, [curr.account]: curr }),
      {} as Record<string, NetworkToken>,
    )
    return this.getConnection(cluster).then((conn) =>
      Promise.all([
        conn.getParsedTokenAccountsByOwner(address, { programId: TOKEN_PROGRAM_ID }).then((res) => res.value ?? []),
        conn
          .getParsedTokenAccountsByOwner(address, { programId: TOKEN_2022_PROGRAM_ID })
          .then((res) => res.value ?? []),
      ]).then(([tokenAccounts, token2022Accounts]) =>
        [...tokenAccounts, ...token2022Accounts]
          .filter((account) => mints.includes(account.account.data.parsed.info.mint.toString()))
          .map((account) => {
            const balance = account.account.data.parsed.info.tokenAmount.uiAmount?.toString() ?? '0'
            const mint = account.account.data.parsed.info.mint
            const program = account.account.owner.toBase58()
            return {
              account: account.pubkey.toString(),
              network: { connect: { cluster } },
              name: tokenMap[mint.toString()]?.name ?? '',
              symbol: tokenMap[mint.toString()]?.symbol ?? '',
              imageUrl: tokenMap[mint.toString()]?.imageUrl ?? undefined,
              owner,
              type: NetworkTokenType.Fungible,
              balance,
              group: mint,
              decimals: 0,
              mint,
              program,
            }
          }),
      ),
    )
  }

  async resolveSolanaFungibleAssetsForOwners({
    cluster,
    mint,
    program,
    owners,
  }: {
    cluster: NetworkCluster
    owners: string[]
    program: string
    mint: string
  }) {
    this.logger.verbose(`resolveSolanaFungibleAssetsForOwners: ${owners.length} owners`)
    const results: SolanaNetworkAsset[] = []

    for (const owner of owners) {
      const cacheKey = `solanaFungibleAssets:${cluster}:${owner}:${mint}:${program}`

      if (!this.solanaNetworkAssetsCache.has(cacheKey)) {
        const res: SolanaNetworkAsset[] = await this.resolveSolanaFungibleAssetsForOwner({
          owner,
          cluster,
          mint,
          program,
        })
        this.solanaNetworkAssetsCache.set(cacheKey, res)
        this.logger.verbose(`resolveSolanaFungibleAssetsForOwners: Cache miss for ${cacheKey}`)
      }
      const found = this.solanaNetworkAssetsCache.get(cacheKey)
      if (found) {
        results.push(...found)
      }
    }
    return results
  }

  async resolveSolanaNonFungibleAssetsForOwner({
    groups,
    cluster,
    owner,
  }: {
    groups: string[]
    cluster: NetworkCluster
    owner: string
  }): Promise<SolanaNetworkAsset[]> {
    return this.getAllAssetsByOwner({ owner, cluster, groups }).then((assets) => {
      const res: SolanaNetworkAsset[] = []

      const map = assets.items?.reduce((acc, curr) => {
        const group = findAssetGroupValue(curr) ?? ''
        const id = curr.id?.toString() ?? ''
        return {
          ...acc,
          [group]: [...(acc[group] ?? []), id],
        }
      }, {} as Record<string, string[]>)

      // For each group, create an asset
      for (const group of Object.keys(map)) {
        const accounts = map[group]
        if (!accounts.length) {
          console.log(`No accounts in ${group} for ${owner}`)
          continue
        }
        res.push({ owner, accounts, amount: `${map[group].length}`, group })
      }

      return res
    })
  }

  async resolveSolanaNonFungibleAssetsForOwners({
    groups,
    cluster,
    owners,
  }: {
    groups: string[]
    cluster: NetworkCluster
    owners: string[]
  }): Promise<SolanaNetworkAsset[]> {
    this.logger.verbose(`resolveSolanaNonFungibleAssets: ${owners.length} owners, ${groups.length} groups`)
    const results: SolanaNetworkAsset[] = []

    for (const owner of owners) {
      const cacheKey = `solanaNonFungibleAssets:${cluster}:${owner}:${groups.join(',')}`

      if (!this.solanaNetworkAssetsCache.has(cacheKey)) {
        const res: SolanaNetworkAsset[] = await this.resolveSolanaNonFungibleAssetsForOwner({ owner, cluster, groups })
        this.solanaNetworkAssetsCache.set(cacheKey, res)
        this.logger.verbose(`resolveSolanaNonFungibleAssets: Cache miss for ${cacheKey}`)
      }
      const found = this.solanaNetworkAssetsCache.get(cacheKey)
      if (found) {
        results.push(...found)
      }
    }
    return results
  }

  async getAllAssetsByOwner({
    owner,
    cluster,
    groups = [],
  }: {
    owner: string
    cluster: NetworkCluster
    groups?: string[]
  }) {
    const tag = `getAllAssetsByOwner(${owner}, ${cluster}, ${groups.join(',')})`
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
        sortBy: { sortBy: 'updated', sortDirection: 'desc' },
      })
      this.logger.verbose(`${tag} - page ${page} - ${assets.items.length} assets`)
      list.items.push(...assets.items)
      list.total += assets.total
      page++
      if (assets.items.length === 0 || assets.items.length < list.limit) {
        break
      }
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

  private async getCachedAnybodiesVaultSnapshot({ vaultId }: { vaultId: string }): Promise<AnybodiesVaultSnapshot> {
    const result = await this.cacheAnybodiesVaults.fetch(vaultId)
    return result ?? []
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
 * @param groups string[] Optional list of groups
 */
export function findAssetsByGroup(items: DasApiAsset[], groups: string[]) {
  return items.filter((item) => groups?.length === 0 || groups.includes(findAssetGroupValue(item) ?? ''))
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
