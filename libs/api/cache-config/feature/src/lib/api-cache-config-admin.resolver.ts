import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLAdminGuard } from '@pubkey-link/api-auth-data-access'
import { ApiCacheConfigService, CacheConfig, CacheConfigKey } from '@pubkey-link/api-cache-config-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLAdminGuard)
export class ApiCacheConfigAdminResolver {
  constructor(private readonly service: ApiCacheConfigService) {}

  @Query(() => [CacheConfig], { nullable: true })
  adminCacheConfig() {
    return this.service.cacheConfig
  }

  @Mutation(() => Boolean, { nullable: true })
  adminCacheConfigSet(
    @Args({ name: 'key', type: () => CacheConfigKey }) key: CacheConfigKey,
    @Args('value') value: string,
  ) {
    return this.service.updateCacheConfig(key, value)
  }
}
