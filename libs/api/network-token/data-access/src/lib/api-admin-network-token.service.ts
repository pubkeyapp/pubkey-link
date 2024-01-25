import { DasApiAsset } from '@metaplex-foundation/digital-asset-standard-api'
import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { NetworkTokenType, Prisma } from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { ApiNetworkService } from '@pubkey-link/api-network-data-access'
import { AdminCreateNetworkTokenInput } from './dto/admin-create-network-token.input'
import { AdminFindManyNetworkTokenInput } from './dto/admin-find-many-network-token.input'
import { AdminUpdateNetworkTokenInput } from './dto/admin-update-network-token.input'
import { NetworkTokenPaging } from './entity/network-token-paging.entity'
import { getAdminNetworkTokenWhereInput } from './helpers/get-admin-network-token-where.input'

@Injectable()
export class ApiAdminNetworkTokenService implements OnModuleInit {
  private readonly logger = new Logger(ApiAdminNetworkTokenService.name)
  constructor(private readonly core: ApiCoreService, private readonly network: ApiNetworkService) {}

  async onModuleInit() {
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
    return this.core.data.networkToken.update({ where: { id: networkTokenId }, data: input })
  }

  async updateNetworkTokenMetadata(networkTokenId: string) {
    const token = await this.core.data.networkToken.findUnique({ where: { id: networkTokenId } })
    if (!token) {
      throw new Error(`Network token ${networkTokenId} not found`)
    }

    const [asset, metadata] = await Promise.all([
      this.network.getAsset({ cluster: token.cluster, account: token.account }),
      this.network.getTokenMetadata({ cluster: token.cluster, account: token.account }),
    ])

    if (!asset || !metadata) {
      throw new Error(`Asset or metadata for ${token.account} not found on cluster ${token.cluster}`)
    }

    const imageUrl = await fetch(metadata.uri)
      .then((res) => res.json())
      .then((res) => res.image)
      .catch((err) => {
        this.logger.warn(`Failed to fetch image for ${metadata.uri}`, err)
        return asset.content.files?.length ? asset.content.files[0].uri : null
      })

    const data: Prisma.NetworkTokenUpdateInput = {
      name: metadata.name ?? asset.content.metadata.name,
      imageUrl,
      metadataUrl: metadata.uri ?? asset.content.json_uri,
      description: asset.content.metadata.description,
      symbol: metadata.symbol ?? asset.content.metadata.symbol,
      raw: { asset, metadata } as unknown as Prisma.InputJsonValue,
    }
    this.logger.verbose(`updateNetworkTokenMetadata`, JSON.stringify(data, null, 2))
    return this.core.data.networkToken.update({
      where: { id: networkTokenId },
      data,
    })
  }
}

export function getNetworkTokenType(int: DasApiAsset['interface'] | string) {
  switch (int) {
    case 'spl-token-2022':
    case 'FungibleAsset':
    case 'FungibleToken':
      return NetworkTokenType.Fungible
    case 'ProgrammableNFT':
    case 'V1_NFT':
    case 'V2_NFT':
      return NetworkTokenType.NonFungible
    default:
      return NetworkTokenType.Unknown
  }
}
