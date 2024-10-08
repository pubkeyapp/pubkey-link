import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { User } from '@prisma/client'
import { ApiAuthGraphQLUserGuard, CtxUser } from '@pubkey-link/api-auth-data-access'
import {
  ApiNetworkAssetService,
  NetworkAsset,
  NetworkAssetPaging,
  UserFindManyNetworkAssetInput,
} from '@pubkey-link/api-network-asset-data-access'
import { NetworkCluster } from '@pubkey-link/api-network-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiUserNetworkAssetResolver {
  constructor(private readonly service: ApiNetworkAssetService) {}

  @Query(() => NetworkAssetPaging)
  userFindManyNetworkAsset(@CtxUser() actor: User, @Args('input') input: UserFindManyNetworkAssetInput) {
    return this.service.user.findManyNetworkAsset(actor, input)
  }

  @Query(() => NetworkAsset, { nullable: true })
  userFindOneNetworkAsset(
    @Args({ name: 'cluster', type: () => NetworkCluster }) cluster: NetworkCluster,
    @Args('account') account: string,
  ) {
    return this.service.user.findOneNetworkAsset(cluster, account)
  }
}
