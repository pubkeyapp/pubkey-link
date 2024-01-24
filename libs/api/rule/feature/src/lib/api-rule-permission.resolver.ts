import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { ApiRuleService, RulePermission } from '@pubkey-link/api-rule-data-access'
import { BotPermission } from '@pubkey-link/api-bot-data-access'

@Resolver(() => RulePermission)
export class ApiRulePermissionResolver {
  constructor(private readonly service: ApiRuleService) {}

  @ResolveField(() => BotPermission, { nullable: true })
  bot(@Parent() permission: RulePermission) {
    return permission.bot ?? null
  }
}
