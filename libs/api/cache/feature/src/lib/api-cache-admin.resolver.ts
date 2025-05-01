import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { NetworkCluster } from '@prisma/client'
import { ApiAuthGraphQLAdminGuard } from '@pubkey-link/api-auth-data-access'
import { ApiCacheService, CacheStatus } from '@pubkey-link/api-cache-data-access'
import { GraphQLJSON } from 'graphql-scalars'

@Resolver()
@UseGuards(ApiAuthGraphQLAdminGuard)
export class ApiCacheAdminResolver {
  constructor(private readonly service: ApiCacheService) {}

  @Query(() => CacheStatus, { nullable: true })
  adminCacheStatus() {
    return this.service.status
  }

  @Query(() => GraphQLJSON, { nullable: true })
  adminCacheDetail(
    @Args({
      name: 'cluster',
      type: () => NetworkCluster,
    })
    cluster: NetworkCluster,
    @Args('cacheId') cacheId: string,
  ) {
    return this.service.assetsSnapshot({ cluster, id: cacheId })
  }

  @Mutation(() => GraphQLJSON, { nullable: true })
  adminCacheResolve(
    @Args({
      name: 'cluster',
      type: () => NetworkCluster,
    })
    cluster: NetworkCluster,
    @Args('cacheId') cacheId: string,
  ) {
    return this.service.resolveCache({ cluster, id: cacheId })
  }
}
