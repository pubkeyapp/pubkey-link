import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { ApiRuleService, Rule } from '@pubkey-link/api-rule-data-access'

@Resolver(() => Rule)
export class ApiRuleResolver {
  constructor(private readonly service: ApiRuleService) {}

  @ResolveField(() => String, { nullable: true })
  viewUrl(@Parent() rule: Rule) {
    return `/c/${rule.communityId}/rules/${rule.id}`
  }
}
