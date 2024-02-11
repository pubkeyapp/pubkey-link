import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { ApiBotService, BotPermission, DiscordRole, DiscordServer } from '@pubkey-link/api-bot-data-access'
import { Role, RolePermission } from '@pubkey-link/api-role-data-access'

@Resolver(() => BotPermission)
export class ApiBotPermissionResolver {
  constructor(private readonly service: ApiBotService) {}

  @ResolveField(() => [Role], { nullable: true })
  roles(@Parent() permission: BotPermission) {
    if (!permission.roles?.length) {
      return []
    }
    return (permission.roles as RolePermission[]).map((r) => r.role)
  }

  @ResolveField(() => DiscordServer, { nullable: true })
  server(@Parent() permission: BotPermission) {
    return this.service.manager.getBotServer(permission.botId, permission.serverId)
  }

  @ResolveField(() => DiscordRole, { nullable: true })
  serverRole(@Parent() permission: BotPermission) {
    return this.service.manager.getBotRole(permission.botId, permission.serverId, permission.serverRoleId)
  }
}
