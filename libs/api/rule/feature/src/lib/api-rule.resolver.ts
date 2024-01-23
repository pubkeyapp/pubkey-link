import { Resolver } from '@nestjs/graphql'
import { ApiRuleService } from '@pubkey-link/api-rule-data-access'
import { Rule } from '@pubkey-link/api-rule-data-access'

@Resolver(() => Rule)
export class ApiRuleResolver {
  constructor(private readonly service: ApiRuleService) {}
}
