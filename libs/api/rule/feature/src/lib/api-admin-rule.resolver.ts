import { Resolver } from '@nestjs/graphql'
import { ApiRuleService } from '@pubkey-link/api-rule-data-access'
import { ApiAuthGraphQLAdminGuard } from '@pubkey-link/api-auth-data-access'
import { Mutation, Query, Args } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateRuleInput,
  AdminFindManyRuleInput,
  Rule,
  RulePaging,
  AdminUpdateRuleInput,
} from '@pubkey-link/api-rule-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLAdminGuard)
export class ApiAdminRuleResolver {
  constructor(private readonly service: ApiRuleService) {}

  @Mutation(() => Rule, { nullable: true })
  adminCreateRule(@Args('input') input: AdminCreateRuleInput) {
    return this.service.admin.createRule(input)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminDeleteRule(@Args('ruleId') ruleId: string) {
    return this.service.admin.deleteRule(ruleId)
  }

  @Query(() => RulePaging)
  adminFindManyRule(@Args('input') input: AdminFindManyRuleInput) {
    return this.service.admin.findManyRule(input)
  }

  @Query(() => Rule, { nullable: true })
  adminFindOneRule(@Args('ruleId') ruleId: string) {
    return this.service.admin.findOneRule(ruleId)
  }

  @Mutation(() => Rule, { nullable: true })
  adminUpdateRule(@Args('ruleId') ruleId: string, @Args('input') input: AdminUpdateRuleInput) {
    return this.service.admin.updateRule(ruleId, input)
  }
}
