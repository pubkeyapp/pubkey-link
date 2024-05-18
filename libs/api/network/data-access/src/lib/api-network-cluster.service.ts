import { AnchorProvider } from '@coral-xyz/anchor'
import { dasApi } from '@metaplex-foundation/digital-asset-standard-api'
import { createUmi, Umi } from '@metaplex-foundation/umi'
import { web3JsRpc } from '@metaplex-foundation/umi-rpc-web3js'
import { Injectable, Logger } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { Network, NetworkCluster } from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { AnchorKeypairWallet } from '@pubkey-program-library/sdk'
import { Connection, Keypair } from '@solana/web3.js'
import { ChainId, Client } from '@solflare-wallet/utl-sdk'
import {
  EVENT_NETWORK_CREATED,
  EVENT_NETWORK_DELETED,
  EVENT_NETWORK_UPDATED,
  EVENT_NETWORKS_PROVISIONED,
} from './api-network.events'

@Injectable()
export class ApiNetworkClusterService {
  private readonly logger = new Logger(ApiNetworkClusterService.name)
  private readonly connections: Map<NetworkCluster, Connection> = new Map()
  private readonly umis: Map<NetworkCluster, Umi> = new Map()
  private readonly tokenList: Map<NetworkCluster, Client> = new Map()
  constructor(readonly core: ApiCoreService) {}

  @OnEvent(EVENT_NETWORK_CREATED)
  async onNetworkCreated({ network: { cluster } }: { network: Network }) {
    this.logger.verbose(`[${cluster}] network created,  initializing`)
    await this.initializeCluster(cluster)
    this.logger.verbose(`[${cluster}] network created, initialized`)
  }

  @OnEvent(EVENT_NETWORK_DELETED)
  async onNetworkDeleted({ network: { cluster } }: { network: Network }) {
    this.logger.verbose(`[${cluster}] network deleted, cleaning up`)
    await this.cleanupCluster(cluster)
    this.logger.verbose(`[${cluster}] network deleted, cleaned up`)
  }

  @OnEvent(EVENT_NETWORK_UPDATED)
  async onNetworkUpdated({ network: { cluster } }: { network: Network }) {
    this.logger.verbose(`[${cluster}] network updated, cleaning up and initializing`)
    await this.cleanupCluster(cluster)
    await this.initializeCluster(cluster)
    this.logger.verbose(`[${cluster}] network updated, initialized`)
  }

  @OnEvent(EVENT_NETWORKS_PROVISIONED)
  async onNetworksProvisioned() {
    const networks = await this.core.data.network.findMany()
    for (const network of networks) {
      this.logger.verbose(`[${network.cluster}] network provisioned, initializing`)
      await this.initializeCluster(network.cluster)
      this.logger.verbose(`[${network.cluster}] network provisioned, initialized`)
    }
  }

  async cleanupCluster(cluster: NetworkCluster) {
    this.logger.verbose(`[${cluster}] cleaning up`)
    this.connections.delete(cluster)
    this.umis.delete(cluster)
    this.tokenList.delete(cluster)
  }

  async initializeCluster(cluster: NetworkCluster) {
    this.logger.verbose(`[${cluster}] initializing`)
    await this.getConnection(cluster)
    await this.getUmi(cluster)
    await this.getTokenList(cluster)
    this.logger.verbose(`[${cluster}] initialized`)
  }

  async getConnection(cluster: NetworkCluster) {
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

  async getAnchorProvider(connection: Connection, keypair = Keypair.generate()) {
    return new AnchorProvider(connection, new AnchorKeypairWallet(keypair), AnchorProvider.defaultOptions())
  }

  async getTokenList(cluster: NetworkCluster) {
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

  async getVoteAccounts() {
    return this.getConnection(NetworkCluster.SolanaDevnet)
      .then((conn) => conn.getVoteAccounts('confirmed'))
      .then((accounts) => accounts.current.map((account) => account.nodePubkey))
  }

  async getUmi(cluster: NetworkCluster) {
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
