import { UseGuards } from '@nestjs/common'
import { Float, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLAdminGuard } from '@pubkey-link/api-auth-data-access'
import { ApiCoreService, AppConfig, StatRecordGroup } from '@pubkey-link/api-core-data-access'

@Resolver()
export class ApiCoreResolver {
  constructor(private readonly service: ApiCoreService) {}

  @Query(() => AppConfig)
  appConfig(): AppConfig {
    return this.service.config.appConfig
  }

  @Query(() => [StatRecordGroup], { nullable: true })
  @UseGuards(ApiAuthGraphQLAdminGuard)
  adminTableStats() {
    return this.service.tableStats()
  }

  @Query(() => Float)
  uptime() {
    return this.service.uptime()
  }
}
