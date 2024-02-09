import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLAdminGuard } from '@pubkey-link/api-auth-data-access'
import {
  AdminFindManyNetworkAssetInput,
  ApiNetworkAssetService,
  NetworkAsset,
  NetworkAssetPaging,
} from '@pubkey-link/api-network-asset-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLAdminGuard)
export class ApiAdminNetworkAssetResolver {
  constructor(private readonly service: ApiNetworkAssetService) {}

  @Mutation(() => Boolean, { nullable: true })
  adminDeleteNetworkAsset(@Args('networkAssetId') networkAssetId: string) {
    return this.service.admin.deleteNetworkAsset(networkAssetId)
  }

  @Query(() => NetworkAssetPaging)
  adminFindManyNetworkAsset(@Args('input') input: AdminFindManyNetworkAssetInput) {
    return this.service.admin.findManyNetworkAsset(input)
  }

  @Query(() => NetworkAsset, { nullable: true })
  adminFindOneNetworkAsset(@Args('networkAssetId') networkAssetId: string) {
    return this.service.admin.findOneNetworkAsset(networkAssetId)
  }
}
