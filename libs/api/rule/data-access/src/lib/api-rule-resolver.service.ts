import { Injectable, Logger } from '@nestjs/common'
import { IdentityProvider, NetworkCluster, NetworkToken, Prisma, RuleConditionType, UserStatus } from '@prisma/client'
import { ApiCommunityService } from '@pubkey-link/api-community-data-access'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { ApiNetworkService, NetworkAsset } from '@pubkey-link/api-network-data-access'
import { LRUCache } from 'lru-cache'
import { RuleCondition } from './entity/rule-condition.entity'

@Injectable()
export class ApiRuleResolverService {
  private readonly cacheAnybodiesVaults = new LRUCache<string, NetworkAsset[]>({
    max: 1000,
    ttl: 1000 * 60 * 60, // 1 hour
  })
  private readonly logger = new Logger(ApiRuleResolverService.name)
  constructor(
    readonly community: ApiCommunityService,
    readonly core: ApiCoreService,
    readonly network: ApiNetworkService,
  ) {}

  async resolve(cluster: NetworkCluster, conditions: RuleCondition[], owner: string): Promise<RuleCondition[]> {
    // We want to loop over all the conditions, resolve them, then tack the resolved network assets onto the condition

    const result: RuleCondition[] = []

    for (const condition of conditions) {
      // const resolved = await this.resolveCondition(cluster, condition, owner)
      // console.log(`Resolved condition "${condition.type}" for "${owner}"`, resolved?.accounts ?? [])
      // const valid = condition.amount && resolved.amount && parseInt(condition.amount) <= parseInt(resolved.amount)
      // result.push({ ...condition, asset: resolved, valid: !!valid })
    }

    return result
  }

  // private async resolveCondition(
  //   cluster: NetworkCluster,
  //   condition: RuleCondition,
  //   owner: string,
  // ): Promise<NetworkAsset[]> {
  //   const { vaultId } = (condition.config ?? {}) as { vaultId?: string }
  //   const account = condition.account
  //   switch (condition.type) {
  //     case RuleConditionType.AnybodiesAsset:
  //       if (!vaultId) {
  //         throw new Error(`Condition ${condition.id} is Missing vaultId`)
  //       }
  //       return this.network.resolveAnybodiesAsset({ owner, vaultId })
  //     case RuleConditionType.SolanaFungibleAsset:
  //       if (!account) {
  //         throw new Error(`Condition ${condition.id} is Missing account`)
  //       }
  //       return this.network.resolveSolanaFungibleAsset({ cluster, account, owner })
  //     case RuleConditionType.SolanaNonFungibleAsset:
  //       if (!account) {
  //         throw new Error(`Condition ${condition.id} is Missing account`)
  //       }
  //       return this.network.resolveSolanaNonFungibleAsset({ cluster, groups: [account], owner })
  //     default:
  //       throw new Error(`Unknown condition type "${condition.type}" for "${condition.id}"`)
  //   }
  // }

  async validateRules(userId: string, communityId: string) {
    const community = await this.community.ensureCommunityAdmin(userId, communityId)

    const startedAt = Date.now()
    await this.core.logInfo(communityId, `Validating rules for community ${communityId}`)

    // We get the conditions for this community and the contexts for all users
    const [conditions, contexts] = await Promise.all([
      this.getRuleConditions({ communityId }),
      this.getRuleValidationContexts({ communityId }),
    ])

    // We need to resolve the assets for each condition and user
    const contextsWithAssets = await this.resolveNetworkAssets({ conditions, contexts })

    // Filter out the contexts that don't have any assets
    const filteredContexts = contextsWithAssets.filter((c) => Object.values(c.assetMap).flat().length > 0)

    // Once we have the assets, we can validate the rules by looping over each condition and checking the assets for each user

    // The best way to do this is to loop over each condition, then loop over each user, then loop over each asset

    const result = {
      duration: Date.now() - startedAt,
      contextsCount: contexts.length,
      contexts: filteredContexts,
    }
    console.log(`Validating ${conditions.length} rules for community ${communityId}`)
    await this.core.logInfo(communityId, `Validated ${conditions.length} rules for community ${communityId}`, {
      data: result as unknown as Prisma.InputJsonValue,
    })
    return Promise.resolve(result)
  }

  private groupConditionsByType(conditions: RuleCondition[]): Record<RuleConditionType, RuleCondition[]> {
    return conditions.reduce((acc, condition) => {
      const type = condition.type
      acc[type] = acc[type] ?? []
      acc[type].push(condition)
      return acc
    }, {} as Record<RuleConditionType, RuleCondition[]>)
  }

  private async resolveNetworkAssets({
    conditions,
    contexts,
  }: {
    conditions: RuleCondition[]
    contexts: RuleValidationContext[]
  }) {
    // Get all the solanaIds
    const solanaIds = contexts.map((c) => c.solanaIds).flat()

    if (!solanaIds.length) {
      this.logger.warn(`No solanaIds found in ${contexts.length} RuleValidationContexts`)
      return []
    }

    // Create a map of solanaIds to assets
    const solanaIdAssets: Record<string, ContextAssetMap> = solanaIds.reduce((acc, solanaId) => {
      acc[solanaId] = createContextAssetMap()
      return acc
    }, {} as Record<string, ContextAssetMap>)

    const groups = this.groupConditionsByType(conditions)

    if (groups[RuleConditionType.AnybodiesAsset].length) {
      const uniqueVaultIds = this.deduplicateAnybodiesVaults(groups[RuleConditionType.AnybodiesAsset])

      // Now we want to loop over each unique vaultId
      for (const vaultId of uniqueVaultIds) {
        // We want to look up the vaultIds with the solanaIds
        const assets = await this.network.resolveAnybodiesAssets({ vaultId, owners: solanaIds ?? [] })

        // Now we want to loop over each asset and add it to the solanaIdAssets map
        for (const asset of assets) {
          solanaIdAssets[asset.owner][RuleConditionType.AnybodiesAsset].push(asset)
        }
      }
    }

    if (groups[RuleConditionType.SolanaFungibleAsset].length) {
      // Get the unique tokens
      const tokens = this.deduplicateTokens(groups[RuleConditionType.SolanaFungibleAsset])

      if (!tokens.length) {
        this.logger.warn(`No unique tokens found in ${conditions.length} conditions`)
        return []
      }

      const cluster = tokens[0].cluster

      for (const token of tokens) {
        // We want to look up the tokens with the solanaIds
        const assets = await this.network.resolveSolanaFungibleAssetsForOwners({
          mint: token.account,
          cluster,
          owners: solanaIds ?? [],
          program: token.program,
        })

        // Now we want to loop over each asset and add it to the solanaIdAssets map
        for (const asset of assets) {
          solanaIdAssets[asset.owner][RuleConditionType.SolanaFungibleAsset].push(asset)
        }
      }
    }

    if (groups[RuleConditionType.SolanaNonFungibleAsset].length) {
      // Get the unique tokens
      const tokens = this.deduplicateTokens(groups[RuleConditionType.SolanaNonFungibleAsset])

      if (!tokens.length) {
        this.logger.warn(`No unique tokens found in ${conditions.length} conditions`)
        return []
      }

      const cluster = tokens[0].cluster
      const accounts = tokens.map((t) => t.account)

      // We want to look up the tokens with the solanaIds
      const assets = await this.network.resolveSolanaNonFungibleAssetsForOwners({
        cluster: cluster,
        groups: accounts,
        owners: solanaIds ?? [],
      })

      // Now we want to loop over each asset and add it to the solanaIdAssets map
      for (const asset of assets) {
        solanaIdAssets[asset.owner][RuleConditionType.SolanaNonFungibleAsset].push(asset)
      }
    }

    // Now we want to loop over each context and add the assets to the context
    for (const context of contexts) {
      // Find the assets for this context
      const contextAssetsMaps = context.solanaIds.map((id) => solanaIdAssets[id])
      if (!contextAssetsMaps.length) {
        this.logger.warn(`No assets found for context ${context.username}`)
        continue
      }

      for (const contextAssetsMap of contextAssetsMaps) {
        for (const type of Object.keys(contextAssetsMap) as RuleConditionType[]) {
          const assets = (contextAssetsMap[type] ?? []).filter((a) => a.accounts?.length > 0)
          if (!assets.length) {
            continue
          }
          context.assetMap[type] = context.assetMap[type].concat(assets)
        }
      }
    }

    return contexts
  }

  private deduplicateAnybodiesVaults(conditions: RuleCondition[]) {
    return conditions
      .map((c) => (c.config as { vaultId?: string })?.vaultId)
      .filter((v) => !!v)
      .filter((v, i, a) => a.indexOf(v) === i) as string[]
  }

  private deduplicateTokens(conditions: RuleCondition[]) {
    return (
      ((conditions.filter((c) => !!c.token).map((c) => c.token) ?? []) as NetworkToken[])
        // A unique token is where the account and cluster are the same
        .filter((t) => !!t.account && !!t.cluster)
        .filter(
          (t, i, a) => a.findIndex((u) => u.account === t.account && u.cluster === t.cluster) === i,
        ) as NetworkToken[]
    )
  }

  private async getRuleConditions({ communityId }: { communityId: string }): Promise<RuleCondition[]> {
    return this.core.data.ruleCondition
      .findMany({
        where: { rule: { communityId } },
        select: {
          account: true,
          amount: true,
          config: true,
          filters: true,
          id: true,
          name: true,
          type: true,
          rule: {
            select: { id: true, name: true },
          },
          token: {
            select: { id: true, account: true, cluster: true, type: true, name: true, program: true },
          },
        },
      })
      .then(
        (conditions) =>
          conditions.map((condition) => ({
            ...condition,
            account: condition.account ?? undefined,
            amount: condition.amount ?? undefined,
            config: condition.config ?? undefined,
            filters: condition.filters ?? undefined,
            name: condition.name ?? condition.type,
            token: condition.token ?? undefined,
          })) as RuleCondition[],
      )
  }

  private async getRuleValidationContexts({ communityId }: { communityId: string }): Promise<RuleValidationContext[]> {
    return this.core.data.user
      .findMany({
        where: {
          // id: { in: userIds },
          status: UserStatus.Active,
          identities: {
            some: {
              //
              bots: { some: { bot: { communityId } } },
              // provider: IdentityProvider.Discord,
            },
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
            ruleIds: [],
          }
        }),
      )
      .then((contexts) => {
        return contexts.filter((c) => !!c.discordId && c.solanaIds?.length > 0) as RuleValidationContext[]
      })
  }
}

type ContextAssetMap = Record<RuleConditionType, NetworkAsset[]>
function createContextAssetMap(): ContextAssetMap {
  return Object.values(RuleConditionType).reduce((acc, type) => {
    acc[type] = []
    return acc
  }, {} as Record<RuleConditionType, NetworkAsset[]>)
}

export interface RuleValidationContext {
  userId: string
  username: string
  discordId: string
  solanaIds: string[]
  assetMap: ContextAssetMap
  ruleIds: string[]
}
