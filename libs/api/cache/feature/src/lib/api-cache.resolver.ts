import { Resolver } from '@nestjs/graphql'
import { ApiCacheService } from '@pubkey-link/api-cache-data-access'

@Resolver()
export class ApiCacheResolver {
  constructor(private readonly service: ApiCacheService) {}
}
