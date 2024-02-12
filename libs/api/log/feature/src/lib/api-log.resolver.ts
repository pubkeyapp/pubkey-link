import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { Bot } from '@pubkey-link/api-bot-data-access'
import { Identity } from '@pubkey-link/api-identity-data-access'
import { ApiLogService, Log } from '@pubkey-link/api-log-data-access'
import { NetworkAsset } from '@pubkey-link/api-network-asset-data-access'
import { Role } from '@pubkey-link/api-role-data-access'
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

  @ResolveField(() => NetworkAsset, { nullable: true })
  networkAsset(@Parent() log: Log) {
    return log.networkAsset
  }

  @ResolveField(() => Role, { nullable: true })
  role(@Parent() log: Log) {
    return log.role
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
