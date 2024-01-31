import { Injectable } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { ApiRuleResolverService } from './api-rule-resolver.service'
import { UserCreateRuleConditionInput } from './dto/user-create-rule-condition.input'
import { UserCreateRulePermissionInput } from './dto/user-create-rule-permission.input'
import { UserCreateRuleInput } from './dto/user-create-rule.input'
import { UserFindManyRuleInput } from './dto/user-find-many-rule.input'
import { UserUpdateRuleConditionInput } from './dto/user-update-rule-condition-input'
import { UserUpdateRuleInput } from './dto/user-update-rule.input'
import { RuleCondition } from './entity/rule-condition.entity'
import { RulePaging } from './entity/rule-paging.entity'
import { getUserRuleWhereInput } from './helpers/get-user-rule-where.input'

@Injectable()
export class ApiUserRuleService {
  constructor(private readonly core: ApiCoreService, private readonly resolver: ApiRuleResolverService) {}

  async createRule(input: UserCreateRuleInput) {
    return this.core.data.rule.create({ data: input })
  }

  async createRuleCondition(input: UserCreateRuleConditionInput) {
    return this.core.data.ruleCondition.create({
      data: {
        account: input.account,
        amount: input.amount,
        config: input.config ?? undefined,
        filters: input.filters ?? undefined,
        name: input.type.toString(),
        rule: { connect: { id: input.ruleId } },
        token: input.tokenId ? { connect: { id: input.tokenId } } : undefined,
        type: input.type,
      },
    })
  }

  async createRulePermission(input: UserCreateRulePermissionInput) {
    return this.core.data.rulePermission.create({
      data: {
        bot: {
          connectOrCreate: {
            where: { botId_serverId_roleId: { botId: input.botId, serverId: input.serverId, roleId: input.roleId } },
            create: { botId: input.botId, serverId: input.serverId, roleId: input.roleId },
          },
        },
        rule: { connect: { id: input.ruleId } },
      },
    })
  }

  async deleteRule(ruleId: string) {
    const deleted = await this.core.data.rule.delete({ where: { id: ruleId } })
    return !!deleted
  }

  async deleteRuleCondition(ruleConditionId: string) {
    const found = await this.core.data.ruleCondition.findUnique({
      where: { id: ruleConditionId },
    })
    if (!found) {
      throw new Error('Rule permission not found')
    }
    const deleted = await this.core.data.ruleCondition.delete({ where: { id: ruleConditionId } })
    return !!deleted
  }

  async deleteRulePermission(rulePermissionId: string) {
    const found = await this.core.data.rulePermission.findUnique({
      where: { id: rulePermissionId },
    })
    if (!found) {
      throw new Error('Rule permission not found')
    }
    const deleted = await this.core.data.rulePermission.delete({ where: { id: rulePermissionId } })
    return !!deleted
  }

  async findManyRule(input: UserFindManyRuleInput): Promise<RulePaging> {
    return this.core.data.rule
      .paginate({
        orderBy: { name: 'asc' },
        where: getUserRuleWhereInput(input),
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

  async updateRule(ruleId: string, input: UserUpdateRuleInput) {
    return this.core.data.rule.update({ where: { id: ruleId }, data: input })
  }

  async updateRuleCondition(ruleConditionId: string, input: UserUpdateRuleConditionInput) {
    return this.core.data.ruleCondition.update({
      where: { id: ruleConditionId },
      data: {
        ...input,
        config: input.config ?? undefined,
        filters: input.filters ?? undefined,
      },
    })
  }

  async validateRule(ruleId: string, address: string): Promise<RuleCondition[]> {
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
