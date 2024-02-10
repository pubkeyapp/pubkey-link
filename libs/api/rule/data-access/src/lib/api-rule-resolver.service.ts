import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import {
  IdentityProvider,
  NetworkAsset,
  NetworkCluster,
  NetworkToken,
  NetworkTokenType,
  Prisma,
  UserStatus,
} from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { ApiNetworkAssetService } from '@pubkey-link/api-network-asset-data-access'
import { ApiNetworkService } from '@pubkey-link/api-network-data-access'
import { RuleCondition } from './entity/rule-condition.entity'

@Injectable()
export class ApiRuleResolverService {
  private readonly logger = new Logger(ApiRuleResolverService.name)
  constructor(
    readonly core: ApiCoreService,
    readonly network: ApiNetworkService,
    readonly networkAsset: ApiNetworkAssetService,
  ) {}

  async resolve(cluster: NetworkCluster, conditions: RuleCondition[], owner: string): Promise<RuleCondition[]> {
    // We want to loop over all the conditions, resolve them, then tack the resolved network assets onto the condition

    const result: RuleCondition[] = []

    return result
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async validateAllRules() {
    this.logger.log(`Validating rules of all communities`)
    const communities = await this.core.data.community.findMany({
      where: {
        bot: {
          isNot: null,
        },
      },
    })
    for (const community of communities) {
      await this.validateRules(community.id)
    }
  }

  async validateRules(communityId: string) {
    const startedAt = Date.now()

    const [conditions, users] = await Promise.all([
      this.getRuleConditions({ communityId }),
      this.getCommunityUsers({ communityId }),
    ])

    const result = {
      duration: Date.now() - startedAt,
      contextsCount: users?.length,
      totalRevoked: 0,
      totalGranted: 0,
    }
    if (!conditions?.length) {
      await this.core.logInfo(`No conditions found for community ${communityId}`, { communityId })
      return result
    }

    for (const user of users) {
      // We are now in the context of a user
      const resolved = await this.resolveNetworkAssetsForContext({ conditions, context: user })

      // Now we want to loop over each condition and check the assets
      for (const condition of conditions) {
        const result = this.validateRuleCondition(condition, resolved.assetMap[condition.type] ?? [])
        if (result) {
          resolved.conditions.push(condition)
        }
      }

      const rules: string[] = (resolved.conditions.map((c) => c.rule?.id) ?? []) as string[]
      if (rules?.length) {
        const ensureRules = await this.ensureCommunityMemberRules({
          communityId,
          userId: resolved.userId,
          rules: rules ?? [],
        })
        if (ensureRules.granted || ensureRules.revoked) {
          await this.core.logInfo(`Rules set: ${ensureRules.granted} granted, ${ensureRules.revoked} revoked`, {
            userId: resolved.userId,
            communityId,
          })
        }
        result.totalGranted += ensureRules.granted
        result.totalRevoked += ensureRules.revoked
      }
    }

    await this.core.logInfo(
      `Validated ${conditions?.length} rules in ${result.duration}ms, ${result.totalGranted} granted, ${result.totalRevoked} revoked`,
      {
        communityId,
        data: result as unknown as Prisma.InputJsonValue,
      },
    )
    return Promise.resolve(result)
  }

  private async ensureCommunityMemberRules({
    communityId,
    userId,
    rules,
  }: {
    communityId: string
    userId: string
    rules: string[]
  }): Promise<{
    granted: number
    revoked: number
  }> {
    const result = {
      granted: 0,
      revoked: 0,
    }
    const existing = await this.core.data.communityMemberRule.findMany({
      where: { member: { communityId, userId } },
    })
    const toGrant = rules.filter((r) => !existing.find((e) => e.ruleId === r))
    const toRevoke = existing.filter((e) => !rules.find((r) => e.ruleId === r)).map((e) => e.ruleId)

    if (!toGrant?.length && !toRevoke?.length) {
      return result
    }

    for (const ruleId of toRevoke) {
      const deleted = await this.core.data.communityMemberRule.deleteMany({
        where: { member: { communityId, userId }, ruleId },
      })
      result.revoked += deleted.count
    }
    for (const ruleId of toGrant) {
      const created = await this.core.data.communityMemberRule.create({
        data: {
          rule: { connect: { id: ruleId } },
          member: { connect: { communityId_userId: { communityId, userId } } },
        },
      })
      result.granted += created ? 1 : 0
    }
    return result
  }

  private validateRuleCondition(condition: RuleCondition, assets: NetworkAsset[]) {
    const found: NetworkAsset[] = assets.filter((asset) => asset.group === condition.token?.account) ?? []
    if (!found?.length) {
      return false
    }

    const filtered =
      condition.type === NetworkTokenType.NonFungible && Object.keys(condition.filters ?? {})
        ? found
            .filter((assets) => !!Object.keys(assets.attributes ?? {})?.length)
            .filter((assets) =>
              validateAttributeFilter({
                attributes: assets.attributes as [string, string][],
                filters: (condition.filters ?? {}) as Record<string, string>,
              }),
            )
        : found

    switch (condition.type) {
      case NetworkTokenType.NonFungible:
        return filtered?.length >= parseInt(condition.amount ?? '0')
      case NetworkTokenType.Fungible:
        return (
          filtered?.reduce((acc, asset) => acc + parseInt(asset.balance ?? '0'), 0) >= parseInt(condition.amount ?? '0')
        )
    }
  }

  private async resolveNetworkAssetsForContext({
    conditions,
    context,
  }: {
    conditions: RuleCondition[]
    context: RuleValidationUser
  }): Promise<RuleValidationUser> {
    // Get all the solanaIds
    const solanaIds = context.solanaIds ?? []

    if (!solanaIds?.length) {
      this.logger.warn(`No solanaIds found in RuleValidationContext`)
      return context
    }

    // Create a map of solanaIds to assets
    const solanaIdAssets: ContextAssetMap = createContextAssetMap()

    const groups = groupConditionsByType(conditions)

    if (groups[NetworkTokenType.Fungible]?.length) {
      // Get the unique tokens
      const tokens = deduplicateTokens(groups[NetworkTokenType.Fungible])

      if (tokens.length) {
        for (const token of tokens) {
          // We want to look up the tokens with the solanaIds
          await this.networkAsset
            .getFungibleAssetsForOwners({
              cluster: token.cluster,
              mint: token.account,
              owners: solanaIds ?? [],
              program: token.program,
            })
            .then((assets) => {
              if (!assets.length) {
                return
              }
              solanaIdAssets[NetworkTokenType.Fungible].push(...assets)
            })
        }
      } else {
        this.logger.warn(`No unique tokens found in ${conditions.length} conditions`)
      }
    }

    if (groups[NetworkTokenType.NonFungible]?.length) {
      // Get the unique tokens
      const tokens = deduplicateTokens(groups[NetworkTokenType.NonFungible])

      if (tokens.length) {
        const cluster = tokens[0].cluster
        const accounts = tokens.map((t) => t.account)
        // We want to look up the tokens with the solanaIds
        await this.networkAsset
          .getNonFungibleAssetsForOwners({
            cluster: cluster,
            groups: accounts,
            owners: solanaIds ?? [],
          })
          .then((assets) => {
            if (!assets.length) {
              return
            }
            solanaIdAssets[NetworkTokenType.NonFungible].push(...assets)
          })
      } else {
        this.logger.warn(`No unique tokens found in ${conditions.length} conditions`)
      }
    }

    // Find the assets for this context
    for (const type of Object.keys(solanaIdAssets) as NetworkTokenType[]) {
      const assets = solanaIdAssets[type] ?? []
      if (!assets.length) {
        continue
      }
      context.assetMap[type] = context.assetMap[type].concat(assets)
    }

    return context
  }

  private async getRuleConditions({ communityId }: { communityId: string }): Promise<RuleCondition[]> {
    return this.core.data.ruleCondition
      .findMany({
        where: { rule: { communityId } },
        select: {
          amount: true,
          config: true,
          filters: true,
          id: true,
          name: true,
          type: true,
          rule: true,
          token: {
            select: { id: true, account: true, cluster: true, type: true, name: true, program: true },
          },
        },
      })
      .then((conditions) =>
        conditions.map((condition) => ({
          ...condition,
          amount: condition.amount ?? undefined,
          config: condition.config ?? undefined,
          filters: condition.filters ?? undefined,
          name: condition.name ?? condition.type,
          token: condition.token ?? undefined,
        })),
      )
  }

  private async getCommunityUsers({ communityId }: { communityId: string }): Promise<RuleValidationUser[]> {
    return this.core.data.user
      .findMany({
        where: {
          status: UserStatus.Active,
          identities: {
            some: { bots: { some: { bot: { communityId } } } },
          },
        },
        select: {
          id: true,
          username: true,
          identities: {
            where: { provider: { in: [IdentityProvider.Discord, IdentityProvider.Solana] } },
            select: { provider: true, providerId: true },
          },
        },
        orderBy: { username: 'asc' },
      })
      .then((users) =>
        users.map((user) => {
          const discordId = user.identities.find((i) => i.provider === IdentityProvider.Discord)?.providerId
          const solanaIds = user.identities
            .filter((i) => i.provider === IdentityProvider.Solana)
            .map((i) => i.providerId)

          return {
            userId: user.id,
            username: user.username,
            discordId,
            solanaIds,
            assetMap: createContextAssetMap(),
            conditions: [],
          }
        }),
      )
      .then((contexts) => {
        return contexts.filter((c) => !!c.discordId && c.solanaIds?.length > 0) as RuleValidationUser[]
      })
  }

  private async getUserContext({ userId }: { userId: string }): Promise<RuleValidationUser> {
    return this.core.data.user
      .findUnique({
        where: { id: userId, status: UserStatus.Active },
        select: {
          id: true,
          username: true,
          identities: {
            where: { provider: { in: [IdentityProvider.Discord, IdentityProvider.Solana] } },
            select: { provider: true, providerId: true },
          },
        },
      })
      .then((user) => {
        if (!user) {
          throw new Error('User not found')
        }
        const discordId = user.identities.find((i) => i.provider === IdentityProvider.Discord)?.providerId
        const solanaIds = user.identities.filter((i) => i.provider === IdentityProvider.Solana).map((i) => i.providerId)

        if (!discordId || !solanaIds.length) {
          throw new Error('User has no discordId or solanaIds')
        }

        return {
          userId: user.id,
          username: user.username,
          discordId,
          solanaIds,
          assetMap: createContextAssetMap(),
          conditions: [],
        }
      })
  }
}

type ContextAssetMap = Record<NetworkTokenType, NetworkAsset[]>
function createContextAssetMap(): ContextAssetMap {
  return Object.values(NetworkTokenType).reduce((acc, type) => {
    acc[type] = []
    return acc
  }, {} as Record<NetworkTokenType, NetworkAsset[]>)
}

export interface RuleValidationUser {
  userId: string
  username: string
  discordId: string
  solanaIds: string[]
  assetMap: ContextAssetMap
  conditions: RuleCondition[]
}

function validateAttributeFilter({
  attributes,
  filters,
}: {
  attributes: [string, string][]
  filters: Record<string, string>
}): boolean {
  return Object.entries(filters).every(([key, value]) => {
    const found = attributes.find(([k, v]) => k === key && v === value)
    return !!found
  })
}

function groupConditionsByType(conditions: RuleCondition[]): Record<NetworkTokenType, RuleCondition[]> {
  return conditions.reduce((acc, condition) => {
    const type = condition.type
    acc[type] = acc[type] ?? []
    acc[type].push(condition)
    return acc
  }, {} as Record<NetworkTokenType, RuleCondition[]>)
}

function deduplicateTokens(conditions: RuleCondition[]) {
  return (
    ((conditions.filter((c) => !!c.token).map((c) => c.token) ?? []) as NetworkToken[])
      // A unique token is where the account and cluster are the same
      .filter((t) => !!t.account && !!t.cluster)
      .filter(
        (t, i, a) => a.findIndex((u) => u.account === t.account && u.cluster === t.cluster) === i,
      ) as NetworkToken[]
  )
}
