import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLUserGuard, CtxUserId } from '@pubkey-link/api-auth-data-access'
import {
  ApiRuleService,
  Rule,
  RuleCondition,
  RulePaging,
  RulePermission,
  UserCreateRuleConditionInput,
  UserCreateRuleInput,
  UserCreateRulePermissionInput,
  UserFindManyRuleInput,
  UserUpdateRuleConditionInput,
  UserUpdateRuleInput,
} from '@pubkey-link/api-rule-data-access'
import { GraphQLJSON } from 'graphql-scalars'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiUserRuleResolver {
  constructor(private readonly service: ApiRuleService) {}

  @Mutation(() => Rule, { nullable: true })
  userCreateRule(@CtxUserId() userId: string, @Args('input') input: UserCreateRuleInput) {
    return this.service.user.createRule(userId, input)
  }

  @Mutation(() => RuleCondition, { nullable: true })
  userCreateRuleCondition(@CtxUserId() userId: string, @Args('input') input: UserCreateRuleConditionInput) {
    return this.service.user.createRuleCondition(userId, input)
  }

  @Mutation(() => RulePermission, { nullable: true })
  userCreateRulePermission(@CtxUserId() userId: string, @Args('input') input: UserCreateRulePermissionInput) {
    return this.service.user.createRulePermission(userId, input)
  }

  @Mutation(() => Boolean, { nullable: true })
  userDeleteRuleCondition(@CtxUserId() userId: string, @Args('ruleConditionId') ruleConditionId: string) {
    return this.service.user.deleteRuleCondition(userId, ruleConditionId)
  }

  @Mutation(() => Boolean, { nullable: true })
  userDeleteRulePermission(@CtxUserId() userId: string, @Args('rulePermissionId') rulePermissionId: string) {
    return this.service.user.deleteRulePermission(userId, rulePermissionId)
  }

  @Mutation(() => Boolean, { nullable: true })
  userDeleteRule(@CtxUserId() userId: string, @Args('ruleId') ruleId: string) {
    return this.service.user.deleteRule(userId, ruleId)
  }

  @Query(() => RulePaging)
  userFindManyRule(@CtxUserId() userId: string, @Args('input') input: UserFindManyRuleInput) {
    return this.service.user.findManyRule(userId, input)
  }

  @Query(() => Rule, { nullable: true })
  userFindOneRule(@CtxUserId() userId: string, @Args('ruleId') ruleId: string) {
    return this.service.user.findOneRule(userId, ruleId)
  }

  @Mutation(() => [RuleCondition], { nullable: true })
  userValidateRule(@CtxUserId() userId: string, @Args('ruleId') ruleId: string, @Args('address') address: string) {
    return this.service.user.validateRule(userId, ruleId, address)
  }

  @Mutation(() => GraphQLJSON, { nullable: true })
  userValidateRules(@CtxUserId() userId: string, @Args('communityId') communityId: string) {
    return this.service.user.validateRules(userId, communityId)
  }

  @Mutation(() => Rule, { nullable: true })
  userUpdateRule(
    @CtxUserId() userId: string,
    @Args('ruleId') ruleId: string,
    @Args('input') input: UserUpdateRuleInput,
  ) {
    return this.service.user.updateRule(userId, ruleId, input)
  }

  @Mutation(() => RuleCondition, { nullable: true })
  userUpdateRuleCondition(
    @CtxUserId() userId: string,
    @Args('ruleConditionId') ruleConditionId: string,
    @Args('input') input: UserUpdateRuleConditionInput,
  ) {
    return this.service.user.updateRuleCondition(userId, ruleConditionId, input)
  }
}
