import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { Bot } from '@pubkey-link/api-bot-data-access'
import { Identity } from '@pubkey-link/api-identity-data-access'
import { ApiLogService, Log } from '@pubkey-link/api-log-data-access'
import { Rule } from '@pubkey-link/api-rule-data-access'
import { User } from '@pubkey-link/api-user-data-access'

@Resolver(() => Log)
export class ApiLogResolver {
  constructor(private readonly service: ApiLogService) {}

  @ResolveField(() => Bot, { nullable: true })
  bot(@Parent() log: Log) {
    return log.bot
  }

  @ResolveField(() => Identity, { nullable: true })
  identity(@Parent() log: Log) {
    return log.identity
  }

  @ResolveField(() => Rule, { nullable: true })
  rule(@Parent() log: Log) {
    return log.rule
  }

  @ResolveField(() => User, { nullable: true })
  user(@Parent() log: Log) {
    return log.user
  }

  @ResolveField(() => String, { nullable: true })
  userId(@Parent() log: Log) {
    return log.userId ?? log.identity?.ownerId
  }
}
