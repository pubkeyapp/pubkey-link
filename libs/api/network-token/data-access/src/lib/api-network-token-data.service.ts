import { Injectable, Logger } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { NetworkCluster, NetworkTokenType, Prisma } from '@prisma/client'
import { ApiCoreService, EVENT_APP_STARTED, PagingInputFields } from '@pubkey-link/api-core-data-access'
import { ApiNetworkService, EVENT_NETWORKS_PROVISIONED } from '@pubkey-link/api-network-data-access'
import { getNetworkTokenType } from '@pubkey-link/api-network-util'
import { SystemProgram } from '@solana/web3.js'
import { AdminUpdateNetworkTokenInput } from './dto/admin-update-network-token.input'
import { NetworkTokenPaging } from './entity/network-token.entity'

@Injectable()
export class ApiNetworkTokenDataService {
  private readonly logger = new Logger(ApiNetworkTokenDataService.name)
  constructor(private readonly core: ApiCoreService, private readonly network: ApiNetworkService) {}

  @OnEvent(EVENT_APP_STARTED)
  async onApplicationStarted() {
    const tokens = await this.core.data.networkToken.findMany({
      where: { metadataUrl: null, network: { cluster: { notIn: [NetworkCluster.SolanaCustom] } } },
    })
    await Promise.all(tokens.map((token) => this.updateNetworkTokenMetadata(token.id)))
  }

  @OnEvent(EVENT_NETWORKS_PROVISIONED)
  async onNetworkProvisioned() {
    await this.ensureGenesisBlock()
  }

  private async ensureGenesisBlock() {
    if (!this.core.config.featureResolverSolanaValidator) {
      return
    }
    this.logger.verbose(`Feature resolverSolanaValidator enabled, ensuring genesis block`)

    const existing = await this.core.data.networkToken.findMany({ where: { type: NetworkTokenType.Validator } })

    const networks = await this.core.data.network.findMany({
      where: { cluster: { notIn: existing.map(({ cluster }) => cluster) } },
    })

    for (const network of networks) {
      const hash = await this.getClusterGenesisHash(network.cluster)
      if (hash) {
        const data: Prisma.NetworkTokenCreateInput = {
          network: { connect: { cluster: network.cluster } },
          type: NetworkTokenType.Validator,
          account: hash,
          name: `Solana Genesis Block`,
          program: SystemProgram.programId.toBase58(),
        }

        await this.core.data.networkToken.create({ data })
        this.logger.log(`Created Genesis Block for cluster ${network.cluster} with genesis hash ${hash}`)
      }
    }
  }

  async create(input: Omit<Prisma.NetworkTokenUncheckedCreateInput, 'type' | 'name' | 'program'>) {
    const info = await this.network.getAccountInfo(input)

    if (!info) {
      throw new Error(`Account ${input.account} not found on cluster ${input.cluster}`)
    }

    const data: Prisma.NetworkTokenCreateInput = {
      network: { connect: { cluster: input.cluster } },
      type: getNetworkTokenType(info?.data?.program),
      account: input.account,
      name: input.account.toString(),
      program: info.owner.toBase58(),
    }
    const created = await this.core.data.networkToken.create({ data })

    return this.updateNetworkTokenMetadata(created.id)
  }

  async delete(networkTokenId: string) {
    await this.findOne(networkTokenId)
    const deleted = await this.core.data.networkToken.delete({ where: { id: networkTokenId } })
    return !!deleted
  }

  async findMany({
    limit = 10,
    page = 1,
    ...input
  }: Prisma.NetworkTokenFindManyArgs & PagingInputFields): Promise<NetworkTokenPaging> {
    return this.core.data.networkToken
      .paginate(input)
      .withPages({ limit, page })
      .then(([data, meta]) => ({ data, meta }))
  }
  async findOne(networkTokenId: string) {
    const found = await this.core.data.networkToken.findUnique({ where: { id: networkTokenId } })
    if (!found) {
      throw new Error(`Network token ${networkTokenId} not found`)
    }
    return found
  }

  async update(networkTokenId: string, input: AdminUpdateNetworkTokenInput) {
    const token = await this.findOne(networkTokenId)

    if (input.vault && token.type !== NetworkTokenType.NonFungible) {
      throw new Error(`Vault can only be set for non-fungible tokens`)
    }
    if (input.vault && !input.vault.includes(':')) {
      throw new Error(`Vault must be in the format <cluster>:<address>`)
    }
    return this.core.data.networkToken.update({ where: { id: networkTokenId }, data: input })
  }

  async updateNetworkTokenMetadata(networkTokenId: string) {
    const token = await this.findOne(networkTokenId)

    if (token.type === NetworkTokenType.Validator) {
      this.logger.verbose(`Skipping metadata update for validator token ${token.id}`)
      return token
    }

    const data: Prisma.NetworkTokenUpdateInput = await this.network.getAllTokenMetadata(token)

    return this.core.data.networkToken.update({
      where: { id: networkTokenId },
      data,
    })
  }

  async getNetworkTokenFilters(username?: string | null): Promise<string[]> {
    if (!username) {
      return []
    }
    return this.core
      .getSolanaIdentities({ username })
      .then((owners) => {
        return this.core.data.networkAsset.findMany({
          where: { owner: { in: owners } },
          select: { group: true },
          distinct: ['group'],
        })
      })
      .then((res) => res.filter((r) => r.group?.length).map((r) => r.group as string))
  }

  private async getClusterGenesisHash(cluster: NetworkCluster) {
    try {
      const connection = await this.network.cluster.getConnection(cluster)
      return await connection.getGenesisHash()
    } catch (_) {
      return null
    }
  }
}
