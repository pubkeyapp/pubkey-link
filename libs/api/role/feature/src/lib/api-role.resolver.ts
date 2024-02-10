import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { ApiRoleService, Role } from '@pubkey-link/api-role-data-access'

@Resolver(() => Role)
export class ApiRoleResolver {
  constructor(private readonly service: ApiRoleService) {}

  @ResolveField(() => String, { nullable: true })
  viewUrl(@Parent() role: Role) {
    return `/c/${role.communityId}/roles/${role.id}`
  }
}
