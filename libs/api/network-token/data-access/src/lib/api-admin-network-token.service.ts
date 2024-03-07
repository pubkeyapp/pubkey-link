import { Injectable, Logger } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { NetworkTokenType, Prisma } from '@prisma/client'
import { ApiCoreService, EVENT_APP_STARTED } from '@pubkey-link/api-core-data-access'
import { ApiNetworkService } from '@pubkey-link/api-network-data-access'
import { getNetworkTokenType } from '@pubkey-link/api-network-util'
import { AdminCreateNetworkTokenInput } from './dto/admin-create-network-token.input'
import { AdminFindManyNetworkTokenInput } from './dto/admin-find-many-network-token.input'
import { AdminUpdateNetworkTokenInput } from './dto/admin-update-network-token.input'
import { NetworkTokenPaging } from './entity/network-token-paging.entity'
import { getAdminNetworkTokenWhereInput } from './helpers/get-admin-network-token-where.input'

@Injectable()
export class ApiAdminNetworkTokenService {
  private readonly logger = new Logger(ApiAdminNetworkTokenService.name)
  constructor(private readonly core: ApiCoreService, private readonly network: ApiNetworkService) {}

  @OnEvent(EVENT_APP_STARTED)
  async onApplicationStarted() {
    const tokens = await this.core.data.networkToken.findMany({ where: { metadataUrl: null } })
    await Promise.all(tokens.map((token) => this.updateNetworkTokenMetadata(token.id)))
  }
  async createNetworkToken(input: AdminCreateNetworkTokenInput) {
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

  async deleteNetworkToken(networkTokenId: string) {
    const deleted = await this.core.data.networkToken.delete({ where: { id: networkTokenId } })
    return !!deleted
  }

  async findManyNetworkToken(input: AdminFindManyNetworkTokenInput): Promise<NetworkTokenPaging> {
    return this.core.data.networkToken
      .paginate({
        orderBy: { name: 'asc' },
        where: getAdminNetworkTokenWhereInput(input),
      })
      .withPages({ limit: input.limit, page: input.page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOneNetworkToken(networkTokenId: string) {
    return this.core.data.networkToken.findUnique({ where: { id: networkTokenId } })
  }

  async updateNetworkToken(networkTokenId: string, input: AdminUpdateNetworkTokenInput) {
    const token = await this.core.data.networkToken.findUnique({ where: { id: networkTokenId } })
    if (!token) {
      throw new Error(`Network token ${networkTokenId} not found`)
    }
    if (input.vault && token.type !== NetworkTokenType.NonFungible) {
      throw new Error(`Vault can only be set for non-fungible tokens`)
    }
    if (input.vault && !input.vault.includes(':')) {
      throw new Error(`Vault must be in the format <cluster>:<address>`)
    }
    return this.core.data.networkToken.update({ where: { id: networkTokenId }, data: input })
  }

  async updateNetworkTokenMetadata(networkTokenId: string) {
    const token = await this.core.data.networkToken.findUnique({ where: { id: networkTokenId } })
    if (!token) {
      throw new Error(`Network token ${networkTokenId} not found`)
    }

    const data: Prisma.NetworkTokenUpdateInput = await this.network.getAllTokenMetadata(token)
    // this.logger.verbose(`updateNetworkTokenMetadata`, JSON.stringify(data, null, 2))
    return this.core.data.networkToken.update({
      where: { id: networkTokenId },
      data,
    })
  }
}
