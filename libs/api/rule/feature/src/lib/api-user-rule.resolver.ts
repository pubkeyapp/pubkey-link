import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLUserGuard } from '@pubkey-link/api-auth-data-access'
import {
  ApiRuleService,
  Rule,
  RuleCondition,
  RulePaging,
  RulePermission,
  UserCreateRuleInput,
  UserCreateRulePermissionInput,
  UserFindManyRuleInput,
  UserUpdateRuleInput,
} from '@pubkey-link/api-rule-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiUserRuleResolver {
  constructor(private readonly service: ApiRuleService) {}

  @Mutation(() => Rule, { nullable: true })
  userCreateRule(@Args('input') input: UserCreateRuleInput) {
    return this.service.user.createRule(input)
  }

  @Mutation(() => RulePermission, { nullable: true })
  userCreateRulePermission(@Args('input') input: UserCreateRulePermissionInput) {
    return this.service.user.createRulePermission(input)
  }

  @Mutation(() => Boolean, { nullable: true })
  userDeleteRulePermission(@Args('rulePermissionId') rulePermissionId: string) {
    return this.service.user.deleteRulePermission(rulePermissionId)
  }

  @Mutation(() => Boolean, { nullable: true })
  userDeleteRule(@Args('ruleId') ruleId: string) {
    return this.service.user.deleteRule(ruleId)
  }

  @Query(() => RulePaging)
  userFindManyRule(@Args('input') input: UserFindManyRuleInput) {
    return this.service.user.findManyRule(input)
  }

  @Query(() => Rule, { nullable: true })
  userFindOneRule(@Args('ruleId') ruleId: string) {
    return this.service.user.findOneRule(ruleId)
  }

  @Mutation(() => [RuleCondition], { nullable: true })
  userValidateRule(@Args('ruleId') ruleId: string, @Args('address') address: string) {
    return this.service.user.validateRule(ruleId, address)
  }

  @Mutation(() => Rule, { nullable: true })
  userUpdateRule(@Args('ruleId') ruleId: string, @Args('input') input: UserUpdateRuleInput) {
    return this.service.user.updateRule(ruleId, input)
  }
}
