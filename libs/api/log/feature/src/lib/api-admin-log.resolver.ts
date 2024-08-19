import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLAdminGuard } from '@pubkey-link/api-auth-data-access'
import { AdminFindManyLogInput, ApiLogService, Log, LogPaging } from '@pubkey-link/api-log-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLAdminGuard)
export class ApiAdminLogResolver {
  constructor(private readonly service: ApiLogService) {}

  @Mutation(() => Boolean, { nullable: true })
  adminDeleteLog(@Args('logId') logId: string) {
    return this.service.admin.deleteLog(logId)
  }

  @Query(() => LogPaging)
  adminFindManyLog(@Args('input') input: AdminFindManyLogInput) {
    return this.service.admin.findManyLog(input)
  }

  @Query(() => Log, { nullable: true })
  adminFindOneLog(@Args('logId') logId: string) {
    return this.service.admin.findOneLog(logId)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminPurgeLogs() {
    return this.service.admin.purgeLogs()
  }
}
