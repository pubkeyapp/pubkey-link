import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { IdentityProvider, NetworkAsset, NetworkToken, NetworkTokenType, Prisma, UserStatus } from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { ApiNetworkAssetService } from '@pubkey-link/api-network-asset-data-access'
import { ApiNetworkService } from '@pubkey-link/api-network-data-access'
import { RoleCondition } from './entity/role-condition.entity'
import { Role } from './entity/role.entity'

@Injectable()
export class ApiRoleResolverService {
  private readonly logger = new Logger(ApiRoleResolverService.name)
  constructor(
    readonly core: ApiCoreService,
    readonly network: ApiNetworkService,
    readonly networkAsset: ApiNetworkAssetService,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async validateAllRoles() {
    if (!this.core.config.syncValidateRoles) {
      this.logger.log(`Role validation is disabled`)
      return
    }
    const communities = await this.core.data.community.findMany({
      where: {
        bot: {
          isNot: null,
        },
      },
    })
    this.logger.log(`Validating roles of ${communities.length} communities`)
    for (const community of communities) {
      await this.validateRoles(community.id)
    }
  }

  async validateRoles(communityId: string) {
    const startedAt = Date.now()

    const [conditions, users] = await Promise.all([
      this.getRoleConditions({ communityId }),
      this.getCommunityUsers({ communityId }),
    ])

    const result = {
      duration: Date.now() - startedAt,
      userCounts: users?.length,
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
        const result = this.validateRoleCondition(condition, resolved.assetMap[condition.type] ?? [])
        if (result) {
          resolved.conditions.push(condition)
        }
      }

      const roles: Role[] = (resolved.conditions.map((c) => c.role) ?? []) as Role[]
      if (roles?.length) {
        const ensureRoles = await this.ensureCommunityMemberRoles({
          communityId,
          userId: resolved.userId,
          roles: roles ?? [],
        })
        if (ensureRoles.granted || ensureRoles.revoked) {
          await this.core.logInfo(`Roles set: ${ensureRoles.granted} granted, ${ensureRoles.revoked} revoked`, {
            userId: resolved.userId,
            communityId,
          })
        }
        result.totalGranted += ensureRoles.granted
        result.totalRevoked += ensureRoles.revoked
      }
    }

    if (result.totalGranted || result.totalRevoked) {
      await this.core.logVerbose(
        `Validated ${conditions?.length} roles in ${result.duration}ms, ${result.totalGranted} granted, ${result.totalRevoked} revoked`,
        {
          communityId,
          data: result as unknown as Prisma.InputJsonValue,
        },
      )
    }
    return Promise.resolve(result)
  }

  private async ensureCommunityMemberRoles({
    communityId,
    userId,
    roles,
  }: {
    communityId: string
    userId: string
    roles: Role[]
  }): Promise<{
    granted: number
    revoked: number
  }> {
    const result = {
      granted: 0,
      revoked: 0,
    }
    const existing = await this.core.data.communityMemberRole.findMany({
      where: { member: { communityId, userId } },
    })
    const toGrant = roles.filter((r) => !existing.find((e) => e.roleId === r.id))
    const toRevoke = existing.filter((e) => !roles.find((r) => e.roleId === r.id))

    if (!toGrant?.length && !toRevoke?.length) {
      return result
    }

    for (const role of toRevoke) {
      const deleted = await this.core.data.communityMemberRole.deleteMany({
        where: { member: { communityId, userId }, roleId: role.id },
      })
      await this.core.logInfo(`Role revoked`, {
        userId,
        communityId,
        relatedId: role.id,
        relatedType: 'Role',
      })
      result.revoked += deleted.count
    }
    for (const role of toGrant) {
      const created = await this.core.data.communityMemberRole.create({
        data: {
          role: { connect: { id: role.id } },
          member: { connect: { communityId_userId: { communityId, userId } } },
        },
      })
      await this.core.logInfo(`Role granted`, {
        userId,
        communityId,
        relatedId: role.id,
        relatedType: 'Role',
      })
      result.granted += created ? 1 : 0
    }
    return result
  }

  private validateRoleCondition(condition: RoleCondition, assets: NetworkAsset[]) {
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
    conditions: RoleCondition[]
    context: RoleValidationUser
  }): Promise<RoleValidationUser> {
    // Get all the solanaIds
    const solanaIds = context.solanaIds ?? []

    if (!solanaIds?.length) {
      this.logger.warn(`No solanaIds found in RoleValidationContext`)
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

  private async getRoleConditions({ communityId }: { communityId: string }): Promise<RoleCondition[]> {
    return this.core.data.roleCondition
      .findMany({
        where: { role: { communityId } },
        select: {
          amount: true,
          config: true,
          filters: true,
          id: true,
          name: true,
          type: true,
          role: true,
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

  private async getCommunityUsers({ communityId }: { communityId: string }): Promise<RoleValidationUser[]> {
    return this.core.data.user
      .findMany({
        where: {
          status: UserStatus.Active,
          identities: {
            some: {},
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
        return contexts.filter((c) => !!c.discordId && c.solanaIds?.length > 0) as RoleValidationUser[]
      })
  }

  private async getUserContext({ userId }: { userId: string }): Promise<RoleValidationUser> {
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

export interface RoleValidationUser {
  userId: string
  username: string
  discordId: string
  solanaIds: string[]
  assetMap: ContextAssetMap
  conditions: RoleCondition[]
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

function groupConditionsByType(conditions: RoleCondition[]): Record<NetworkTokenType, RoleCondition[]> {
  return conditions.reduce((acc, condition) => {
    const type = condition.type
    acc[type] = acc[type] ?? []
    acc[type].push(condition)
    return acc
  }, {} as Record<NetworkTokenType, RoleCondition[]>)
}

function deduplicateTokens(conditions: RoleCondition[]) {
  return (
    ((conditions.filter((c) => !!c.token).map((c) => c.token) ?? []) as NetworkToken[])
      // A unique token is where the account and cluster are the same
      .filter((t) => !!t.account && !!t.cluster)
      .filter(
        (t, i, a) => a.findIndex((u) => u.account === t.account && u.cluster === t.cluster) === i,
      ) as NetworkToken[]
  )
}