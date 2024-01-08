import { ApiCoreService, AppConfig } from '@pubkey-link/api-core-data-access'
import { Float, Query, Resolver } from '@nestjs/graphql'

@Resolver()
export class ApiCoreResolver {
  constructor(private readonly service: ApiCoreService) {}

  @Query(() => AppConfig)
  appConfig(): AppConfig {
    return this.service.config.appConfig
  }

  @Query(() => Float)
  uptime() {
    return this.service.uptime()
  }
}
