import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { ApiBotService, BotRole, DiscordRole, DiscordServer } from '@pubkey-link/api-bot-data-access'
import { Role, RolePermission } from '@pubkey-link/api-role-data-access'

@Resolver(() => BotRole)
export class ApiBotRoleResolver {
  constructor(private readonly service: ApiBotService) {}

  @ResolveField(() => [Role], { nullable: true })
  permissions(@Parent() role: BotRole) {
    if (!role.permissions?.length) {
      return []
    }
    return (role.permissions as RolePermission[]).map((r) => r.role)
  }

  @ResolveField(() => DiscordServer, { nullable: true })
  server(@Parent() { botId, serverId }: BotRole) {
    return this.service.instances.getBotServer({ botId, serverId })
  }

  @ResolveField(() => DiscordRole, { nullable: true })
  serverRole(@Parent() { botId, serverId, serverRoleId }: BotRole) {
    return this.service.instances.getBotRole({ botId, serverId, roleId: serverRoleId })
  }
}
