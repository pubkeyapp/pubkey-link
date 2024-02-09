import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLUserGuard, CtxUserId } from '@pubkey-link/api-auth-data-access'
import { ApiLogService, Log, LogPaging, UserFindManyLogInput } from '@pubkey-link/api-log-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiUserLogResolver {
  constructor(private readonly service: ApiLogService) {}

  @Query(() => LogPaging)
  userFindManyLog(@CtxUserId() userId: string, @Args('input') input: UserFindManyLogInput) {
    return this.service.user.findManyLog(userId, input)
  }

  @Query(() => Log, { nullable: true })
  userFindOneLog(@CtxUserId() userId: string, @Args('logId') logId: string) {
    return this.service.user.findOneLog(userId, logId)
  }
}
