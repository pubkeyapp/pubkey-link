import { Resolver } from '@nestjs/graphql'
import { ApiRoleService } from '@pubkey-link/api-role-data-access'
import { ApiAuthGraphQLAdminGuard } from '@pubkey-link/api-auth-data-access'
import { Mutation, Query, Args } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateRoleInput,
  AdminFindManyRoleInput,
  Role,
  RolePaging,
  AdminUpdateRoleInput,
} from '@pubkey-link/api-role-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLAdminGuard)
export class ApiAdminRoleResolver {
  constructor(private readonly service: ApiRoleService) {}

  @Mutation(() => Role, { nullable: true })
  adminCreateRole(@Args('input') input: AdminCreateRoleInput) {
    return this.service.admin.createRole(input)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminDeleteRole(@Args('roleId') roleId: string) {
    return this.service.admin.deleteRole(roleId)
  }

  @Query(() => RolePaging)
  adminFindManyRole(@Args('input') input: AdminFindManyRoleInput) {
    return this.service.admin.findManyRole(input)
  }

  @Query(() => Role, { nullable: true })
  adminFindOneRole(@Args('roleId') roleId: string) {
    return this.service.admin.findOneRole(roleId)
  }

  @Mutation(() => Role, { nullable: true })
  adminUpdateRole(@Args('roleId') roleId: string, @Args('input') input: AdminUpdateRoleInput) {
    return this.service.admin.updateRole(roleId, input)
  }
}
