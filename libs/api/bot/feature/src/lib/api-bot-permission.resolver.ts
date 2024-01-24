import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { ApiBotService, BotPermission, DiscordRole, DiscordServer } from '@pubkey-link/api-bot-data-access'
import { Rule, RulePermission } from '@pubkey-link/api-rule-data-access'

@Resolver(() => BotPermission)
export class ApiBotPermissionResolver {
  constructor(private readonly service: ApiBotService) {}

  @ResolveField(() => DiscordRole, { nullable: true })
  role(@Parent() permission: BotPermission) {
    return this.service.manager.getBotRole(permission.botId, permission.serverId, permission.roleId)
  }

  @ResolveField(() => [Rule], { nullable: true })
  rules(@Parent() permission: BotPermission) {
    if (!permission.rules?.length) {
      return []
    }
    return (permission.rules as RulePermission[]).map((r) => r.rule)
  }

  @ResolveField(() => DiscordServer, { nullable: true })
  server(@Parent() permission: BotPermission) {
    return this.service.manager.getBotServer(permission.botId, permission.serverId)
  }
}
