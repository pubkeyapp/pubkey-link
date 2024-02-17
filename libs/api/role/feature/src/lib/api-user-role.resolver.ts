import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLUserGuard, CtxUserId } from '@pubkey-link/api-auth-data-access'
import {
  ApiRoleService,
  Role,
  RoleCondition,
  RolePaging,
  RolePermission,
  UserCreateRoleConditionInput,
  UserCreateRoleInput,
  UserCreateRolePermissionInput,
  UserFindManyRoleInput,
  UserUpdateRoleConditionInput,
  UserUpdateRoleInput,
} from '@pubkey-link/api-role-data-access'
import { GraphQLJSON } from 'graphql-scalars'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiUserRoleResolver {
  constructor(private readonly service: ApiRoleService) {}

  @Mutation(() => Role, { nullable: true })
  userCreateRole(@CtxUserId() userId: string, @Args('input') input: UserCreateRoleInput) {
    return this.service.user.createRole(userId, input)
  }

  @Mutation(() => RoleCondition, { nullable: true })
  userCreateRoleCondition(@CtxUserId() userId: string, @Args('input') input: UserCreateRoleConditionInput) {
    return this.service.user.createRoleCondition(userId, input)
  }

  @Mutation(() => RolePermission, { nullable: true })
  userCreateRolePermission(@CtxUserId() userId: string, @Args('input') input: UserCreateRolePermissionInput) {
    return this.service.user.createRolePermission(userId, input)
  }

  @Mutation(() => Boolean, { nullable: true })
  userDeleteRoleCondition(@CtxUserId() userId: string, @Args('roleConditionId') roleConditionId: string) {
    return this.service.user.deleteRoleCondition(userId, roleConditionId)
  }

  @Mutation(() => Boolean, { nullable: true })
  userDeleteRolePermission(@CtxUserId() userId: string, @Args('rolePermissionId') rolePermissionId: string) {
    return this.service.user.deleteRolePermission(userId, rolePermissionId)
  }

  @Mutation(() => Boolean, { nullable: true })
  userDeleteRole(@CtxUserId() userId: string, @Args('roleId') roleId: string) {
    return this.service.user.deleteRole(userId, roleId)
  }

  @Query(() => RolePaging)
  userFindManyRole(@CtxUserId() userId: string, @Args('input') input: UserFindManyRoleInput) {
    return this.service.user.findManyRole(userId, input)
  }

  @Query(() => Role, { nullable: true })
  userFindOneRole(@CtxUserId() userId: string, @Args('roleId') roleId: string) {
    return this.service.user.findOneRole(userId, roleId)
  }

  @Mutation(() => GraphQLJSON, { nullable: true })
  userSyncCommunityRoles(@CtxUserId() userId: string, @Args('communityId') communityId: string) {
    return this.service.user.userSyncCommunityRoles(userId, communityId)
  }

  @Mutation(() => Role, { nullable: true })
  userUpdateRole(
    @CtxUserId() userId: string,
    @Args('roleId') roleId: string,
    @Args('input') input: UserUpdateRoleInput,
  ) {
    return this.service.user.updateRole(userId, roleId, input)
  }

  @Mutation(() => RoleCondition, { nullable: true })
  userUpdateRoleCondition(
    @CtxUserId() userId: string,
    @Args('roleConditionId') roleConditionId: string,
    @Args('input') input: UserUpdateRoleConditionInput,
  ) {
    return this.service.user.updateRoleCondition(userId, roleConditionId, input)
  }
}
