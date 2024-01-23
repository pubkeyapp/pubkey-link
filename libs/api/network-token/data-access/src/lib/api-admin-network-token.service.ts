import { Injectable } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { AdminCreateNetworkTokenInput } from './dto/admin-create-network-token.input'
import { AdminFindManyNetworkTokenInput } from './dto/admin-find-many-network-token.input'
import { AdminUpdateNetworkTokenInput } from './dto/admin-update-network-token.input'
import { NetworkTokenPaging } from './entity/network-token-paging.entity'
import { getAdminNetworkTokenWhereInput } from './helpers/get-admin-network-token-where.input'
import { ApiNetworkService } from '@pubkey-link/api-network-data-access'
import { NetworkTokenType, Prisma } from '@prisma/client'
import { DasApiAsset } from '@metaplex-foundation/digital-asset-standard-api'

@Injectable()
export class ApiAdminNetworkTokenService {
  constructor(private readonly core: ApiCoreService, private readonly network: ApiNetworkService) {}

  async createNetworkToken(input: AdminCreateNetworkTokenInput) {
    const asset = await this.network.getAsset(input)

    if (!asset) {
      throw new Error(`Asset ${input.account} not found on cluster ${input.cluster}`)
    }

    const data: Prisma.NetworkTokenCreateInput = {
      network: { connect: { cluster: input.cluster } },
      type: getNetworkTokenType(asset.interface),
      account: asset.id,
      name: asset.content.metadata.name,
      program: (asset as unknown as { token_info: { token_program: string } })?.token_info?.token_program ?? 'NONE',
      imageUrl: asset.content.files?.length ? asset.content.files[0].uri : null,
      metadataUrl: asset.content.json_uri,
      description: asset.content.metadata.description,
      symbol: asset.content.metadata.symbol,
      raw: asset as Prisma.InputJsonValue,
    }
    return this.core.data.networkToken.create({ data })
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
}

export function getNetworkTokenType(int: DasApiAsset['interface'] | string) {
  switch (int) {
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
