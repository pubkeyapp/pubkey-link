import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { ApiRoleService, RolePermission } from '@pubkey-link/api-role-data-access'
import { BotPermission } from '@pubkey-link/api-bot-data-access'

@Resolver(() => RolePermission)
export class ApiRolePermissionResolver {
  constructor(private readonly service: ApiRoleService) {}

  @ResolveField(() => BotPermission, { nullable: true })
  bot(@Parent() permission: RolePermission) {
    return permission.bot ?? null
  }
}
