import { Resolver } from '@nestjs/graphql'
import { ApiCacheConfigService } from '@pubkey-link/api-cache-config-data-access'
import { CacheConfig } from '@pubkey-link/api-cache-config-data-access'

@Resolver(() => CacheConfig)
export class ApiCacheConfigResolver {
  constructor(private readonly service: ApiCacheConfigService) {}
}
