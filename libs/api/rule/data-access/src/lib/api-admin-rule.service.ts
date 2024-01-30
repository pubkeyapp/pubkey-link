import { Injectable } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { AdminCreateRuleInput } from './dto/admin-create-rule.input'
import { AdminFindManyRuleInput } from './dto/admin-find-many-rule.input'
import { AdminUpdateRuleInput } from './dto/admin-update-rule.input'
import { RulePaging } from './entity/rule-paging.entity'
import { getAdminRuleWhereInput } from './helpers/get-admin-rule-where.input'

@Injectable()
export class ApiAdminRuleService {
  constructor(private readonly core: ApiCoreService) {}

  async createRule(input: AdminCreateRuleInput) {
    return this.core.data.rule.create({ data: input })
  }

  async deleteRule(ruleId: string) {
    const deleted = await this.core.data.rule.delete({ where: { id: ruleId } })
    return !!deleted
  }

  async findManyRule(input: AdminFindManyRuleInput): Promise<RulePaging> {
    return this.core.data.rule
      .paginate({
        orderBy: { createdAt: 'desc' },
        where: getAdminRuleWhereInput(input),
        include: { conditions: { include: { token: true } } },
      })
      .withPages({ limit: input.limit, page: input.page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOneRule(ruleId: string) {
    return this.core.data.rule.findUnique({
      where: { id: ruleId },
      include: {
        conditions: { include: { token: true }, orderBy: { name: 'asc' } },
        community: true,
        permissions: { include: { bot: true } },
      },
    })
  }

  async updateRule(ruleId: string, input: AdminUpdateRuleInput) {
    return this.core.data.rule.update({ where: { id: ruleId }, data: input })
  }
}
