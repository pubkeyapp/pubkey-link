import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLUserGuard } from '@pubkey-link/api-auth-data-access'
import { ApiLogService, Log, LogPaging, UserFindManyLogInput } from '@pubkey-link/api-log-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiUserLogResolver {
  constructor(private readonly service: ApiLogService) {}

  @Mutation(() => Boolean, { nullable: true })
  userDeleteLog(@Args('logId') logId: string) {
    return this.service.user.deleteLog(logId)
  }

  @Query(() => LogPaging)
  userFindManyLog(@Args('input') input: UserFindManyLogInput) {
    return this.service.user.findManyLog(input)
  }

  @Query(() => Log, { nullable: true })
  userFindOneLog(@Args('logId') logId: string) {
    return this.service.user.findOneLog(logId)
  }
}
