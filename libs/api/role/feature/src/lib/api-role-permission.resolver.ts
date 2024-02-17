import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { BotRole } from '@pubkey-link/api-bot-data-access'
import { ApiRoleService, RolePermission } from '@pubkey-link/api-role-data-access'

@Resolver(() => RolePermission)
export class ApiRolePermissionResolver {
  constructor(private readonly service: ApiRoleService) {}

  @ResolveField(() => BotRole, { nullable: true })
  botRole(@Parent() permission: RolePermission) {
    return permission.botRole ?? null
  }
}
