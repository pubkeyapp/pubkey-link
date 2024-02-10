import { DasApiAssetList } from '@metaplex-foundation/digital-asset-standard-api'
import { publicKey } from '@metaplex-foundation/umi'
import { Injectable, Logger } from '@nestjs/common'
import { NetworkCluster, NetworkResolver, NetworkToken, NetworkTokenType, Prisma } from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import {
  AnybodiesVaultSnapshot,
  findAssetGroupValue,
  findAssetsByGroup,
  getAnybodiesVaultSnapshot,
  NetworkAssetInput,
} from '@pubkey-link/api-network-util'
import { getTokenMetadata, TOKEN_2022_PROGRAM_ID, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { TokenMetadata } from '@solana/spl-token-metadata'
import { AccountInfo, ParsedAccountData, PublicKey } from '@solana/web3.js'
import { Token } from '@solflare-wallet/utl-sdk'
import { LRUCache } from 'lru-cache'
import { ApiAdminNetworkService } from './api-admin-network.service'
import { ApiNetworkClusterService } from './api-network-cluster.service'
import { SolanaNetworkAsset } from './entity/solana-network-asset.entity'
import { ApiNetworkResolverService } from './resolver/api-network-resolver.service'

@Injectable()
export class ApiNetworkService {
  private readonly cacheAnybodiesVaults = new LRUCache<string, AnybodiesVaultSnapshot>({
    max: 1000,
    ttl: 1000 * 60 * 60, // 1 hour
    fetchMethod: async (vault) => {
      this.logger.verbose(`cacheAnybodiesVaults: Cache miss for ${vault}`)
      return getAnybodiesVaultSnapshot({ vault })
    },
  })

  private readonly solanaNetworkAssetsCache = new LRUCache<string, SolanaNetworkAsset[]>({
    max: 1000,
    ttl: 1000 * 60 * 60, // 1 hour
  })

  private readonly logger = new Logger(ApiNetworkService.name)
  constructor(
    readonly admin: ApiAdminNetworkService,
    readonly cluster: ApiNetworkClusterService,
    readonly core: ApiCoreService,
    readonly resolver: ApiNetworkResolverService,
  ) {}

  async resolveAnybodiesAssets({ owners, vault }: { owners: string[]; vault: string }): Promise<SolanaNetworkAsset[]> {
    const snapshot: AnybodiesVaultSnapshot = await this.getCachedAnybodiesVaultSnapshot({ vault }).then((snapshot) =>
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
          group: `vault:${vault}`,
        },
      }
    }, {} as Record<string, SolanaNetworkAsset>)

    return Object.values(ownerMap)
  }

  async getAccountInfo({ cluster, account }: { cluster: NetworkCluster; account: string }) {
    console.log('getAccountInfo', cluster, account)
    return this.cluster
      .getConnection(cluster)
      .then((conn) =>
        conn.getParsedAccountInfo(new PublicKey(account)).then((res) => res.value as AccountInfo<ParsedAccountData>),
      )
  }
  async getTokenMetadata({ cluster, account }: { cluster: NetworkCluster; account: string }) {
    console.log('getTokenMetadata', cluster, account)
    return this.cluster
      .getConnection(cluster)
      .then((conn) =>
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
      tokenList = await this.cluster.getTokenList(cluster).then((res) => res.fetchMint(new PublicKey(account)))
    } catch (e) {
      this.logger.verbose(`Failed to fetch token list for ${account}`)
    }

    if (!asset && !metadata && !tokenList) {
      throw new Error(`Asset or metadata for ${account} not found on cluster ${cluster}`)
    }

    const imageUrl = asset.content.files?.length
      ? asset.content.files[0].uri
      : metadata?.uri
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
    return this.cluster.getConnection(cluster).then((conn) =>
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
    return this.cluster.getUmi(cluster).then((res) => res.rpc.getAsset(publicKey(account)))
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
    return this.cluster
      .getConnection(cluster)
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
  }): Promise<NetworkAssetInput[]> {
    const address = new PublicKey(owner)
    const mints = tokens.map((token) => token.account)
    const tokenMap = tokens.reduce(
      (acc, curr) => ({ ...acc, [curr.account]: curr }),
      {} as Record<string, NetworkToken>,
    )
    return this.cluster.getConnection(cluster).then((conn) =>
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
              network: { connect: { cluster } },
              resolver: NetworkResolver.SolanaFungible,
              type: NetworkTokenType.Fungible,
              account: account.pubkey.toString(),
              name: tokenMap[mint.toString()]?.name ?? '',
              symbol: tokenMap[mint.toString()]?.symbol ?? '',
              imageUrl: tokenMap[mint.toString()]?.imageUrl ?? undefined,
              owner,
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
    const umi = await this.cluster.getUmi(cluster)

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

  private async getCachedAnybodiesVaultSnapshot({ vault }: { vault: string }): Promise<AnybodiesVaultSnapshot> {
    const result = await this.cacheAnybodiesVaults.fetch(vault)
    return result ?? []
  }
}
