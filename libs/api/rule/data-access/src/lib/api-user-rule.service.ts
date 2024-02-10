import { Injectable } from '@nestjs/common'
import { CommunityRole } from '@prisma/client'
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

  async createRule(userId: string, input: UserCreateRuleInput) {
    await this.core.ensureCommunityAdmin({ communityId: input.communityId, userId })
    return this.core.data.rule.create({ data: input })
  }

  async createRuleCondition(userId: string, input: UserCreateRuleConditionInput) {
    await this.ensureRuleAdmin({ userId, ruleId: input.ruleId })
    return this.core.data.ruleCondition.create({
      data: {
        config: input.config ?? undefined,
        filters: input.filters ?? undefined,
        name: input.type.toString(),
        rule: { connect: { id: input.ruleId } },
        token: { connect: { id: input.tokenId } },
        type: input.type,
      },
    })
  }

  async createRulePermission(userId: string, input: UserCreateRulePermissionInput) {
    await this.ensureRuleAdmin({ userId, ruleId: input.ruleId })
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

  async deleteRule(userId: string, ruleId: string) {
    await this.ensureRuleAdmin({ userId, ruleId })
    const deleted = await this.core.data.rule.delete({ where: { id: ruleId } })
    return !!deleted
  }

  async deleteRuleCondition(userId: string, ruleConditionId: string) {
    const found = await this.core.data.ruleCondition.findUnique({
      where: { id: ruleConditionId },
    })
    if (!found) {
      throw new Error('Rule condition not found')
    }
    await this.ensureRuleAdmin({ userId, ruleId: found.ruleId })
    const deleted = await this.core.data.ruleCondition.delete({ where: { id: ruleConditionId } })
    return !!deleted
  }

  async deleteRulePermission(userId: string, rulePermissionId: string) {
    const found = await this.core.data.rulePermission.findUnique({
      where: { id: rulePermissionId },
    })
    if (!found) {
      throw new Error('Rule permission not found')
    }
    await this.ensureRuleAdmin({ userId, ruleId: found.ruleId })
    const deleted = await this.core.data.rulePermission.delete({ where: { id: rulePermissionId } })
    return !!deleted
  }

  async findManyRule(userId: string, input: UserFindManyRuleInput): Promise<RulePaging> {
    await this.core.ensureCommunityAccess({ communityId: input.communityId, userId })
    return this.core.data.rule
      .paginate({
        orderBy: { name: 'asc' },
        where: getUserRuleWhereInput(input),
        include: { conditions: { include: { token: true } } },
      })
      .withPages({ limit: input.limit, page: input.page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOneRule(userId: string, ruleId: string) {
    await this.ensureRuleAccess({ ruleId, userId })
    return this.core.data.rule.findUnique({
      where: { id: ruleId },
      include: {
        conditions: { include: { token: true }, orderBy: { name: 'asc' } },
        community: true,
        permissions: { include: { bot: true } },
      },
    })
  }

  async updateRule(userId: string, ruleId: string, input: UserUpdateRuleInput) {
    await this.ensureRuleAdmin({ userId, ruleId })
    return this.core.data.rule.update({ where: { id: ruleId }, data: input })
  }

  async updateRuleCondition(userId: string, ruleConditionId: string, input: UserUpdateRuleConditionInput) {
    const found = await this.core.data.ruleCondition.findUnique({ where: { id: ruleConditionId } })
    if (!found) {
      throw new Error('Rule condition not found')
    }
    await this.ensureRuleAdmin({ userId, ruleId: found.ruleId })
    return this.core.data.ruleCondition.update({
      where: { id: ruleConditionId },
      data: {
        ...input,
        amount: input.amount ?? undefined,
        config: input.config ?? undefined,
        filters: input.filters ?? undefined,
      },
    })
  }

  async validateRule(userId: string, ruleId: string, address: string): Promise<RuleCondition[]> {
    await this.ensureRuleAdmin({ ruleId, userId })
    const rule = await this.findOneRule(userId, ruleId)
    if (!rule) {
      throw new Error('Rule not found')
    }

    if (!rule.conditions.length) {
      throw new Error('Rule has no conditions')
    }

    return this.resolver.resolve(rule.community.cluster, rule.conditions, address)
  }

  async validateRules(userId: string, communityId: string) {
    await this.core.ensureCommunityAdmin({ communityId, userId })
    return this.resolver.validateRules(communityId)
  }

  private async ensureRuleAdmin({ userId, ruleId }: { userId: string; ruleId: string }) {
    const { rule, communityRole } = await this.ensureRuleAccess({ userId, ruleId })
    if (communityRole !== CommunityRole.Admin) {
      throw new Error('User is not an admin')
    }
    return { rule, communityRole }
  }
  private async ensureRuleAccess({ userId, ruleId }: { userId: string; ruleId: string }) {
    const rule = await this.core.data.rule.findUnique({ where: { id: ruleId } })
    if (!rule) {
      throw new Error('Rule not found')
    }
    const communityRole = await this.core.ensureCommunityAccess({ communityId: rule.communityId, userId })

    return { rule, communityRole }
  }
}
