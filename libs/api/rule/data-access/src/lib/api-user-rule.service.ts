import { Injectable } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { UserCreateRuleInput } from './dto/user-create-rule.input'
import { UserFindManyRuleInput } from './dto/user-find-many-rule.input'
import { UserUpdateRuleInput } from './dto/user-update-rule.input'
import { RulePaging } from './entity/rule-paging.entity'
import { getUserRuleWhereInput } from './helpers/get-user-rule-where.input'
import { ApiRuleResolverService } from './api-rule-resolver.service'

@Injectable()
export class ApiUserRuleService {
  constructor(private readonly core: ApiCoreService, private readonly resolver: ApiRuleResolverService) {}

  async createRule(input: UserCreateRuleInput) {
    return this.core.data.rule.create({ data: input })
  }

  async deleteRule(ruleId: string) {
    const deleted = await this.core.data.rule.delete({ where: { id: ruleId } })
    return !!deleted
  }

  async findManyRule(input: UserFindManyRuleInput): Promise<RulePaging> {
    return this.core.data.rule
      .paginate({
        orderBy: { name: 'asc' },
        where: getUserRuleWhereInput(input),
        include: { conditions: true },
      })
      .withPages({ limit: input.limit, page: input.page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOneRule(ruleId: string) {
    return this.core.data.rule.findUnique({ where: { id: ruleId }, include: { conditions: true, community: true } })
  }

  async updateRule(ruleId: string, input: UserUpdateRuleInput) {
    return this.core.data.rule.update({ where: { id: ruleId }, data: input })
  }

  async testRule(ruleId: string, address: string) {
    const rule = await this.findOneRule(ruleId)
    if (!rule) {
      throw new Error('Rule not found')
    }

    if (!rule.conditions.length) {
      throw new Error('Rule has no conditions')
    }

    return this.resolver.resolve(rule.community.cluster, rule.conditions, address)
  }
}
