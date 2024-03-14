import { publicKey } from '@metaplex-foundation/umi'
import { Injectable, Logger } from '@nestjs/common'
import { NetworkCluster, Prisma } from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { getNetworkTokenType } from '@pubkey-link/api-network-util'
import { getTokenMetadata, TOKEN_2022_PROGRAM_ID, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { TokenMetadata } from '@solana/spl-token-metadata'
import { AccountInfo, BlockhashWithExpiryBlockHeight, ParsedAccountData, PublicKey } from '@solana/web3.js'
import { Token } from '@solflare-wallet/utl-sdk'
import { LRUCache } from 'lru-cache'
import { ApiNetworkClusterService } from './api-network-cluster.service'
import { ApiNetworkDataAdminService } from './api-network-data-admin.service'
import { ApiNetworkResolverService } from './resolver/api-network-resolver.service'

@Injectable()
export class ApiNetworkService {
  readonly blockhashCache = new LRUCache<NetworkCluster, BlockhashWithExpiryBlockHeight>({
    max: 1000,
    ttl: 1000 * 30, // 30 seconds
    fetchMethod: async (cluster: NetworkCluster) => {
      this.logger.verbose(`blockhashCache: Cache miss for ${cluster}`)
      return this.cluster.getConnection(cluster).then((conn) => conn.getLatestBlockhash())
    },
  })

  private readonly logger = new Logger(ApiNetworkService.name)
  constructor(
    readonly admin: ApiNetworkDataAdminService,
    readonly cluster: ApiNetworkClusterService,
    readonly core: ApiCoreService,
    readonly resolver: ApiNetworkResolverService,
  ) {}

  async ensureBlockhash(cluster: NetworkCluster) {
    const res = await this.blockhashCache.fetch(cluster)
    if (!res?.blockhash) {
      throw new Error(`Blockhash not found`)
    }
    return res.blockhash
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
      type: getNetworkTokenType(asset?.interface),
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
}
