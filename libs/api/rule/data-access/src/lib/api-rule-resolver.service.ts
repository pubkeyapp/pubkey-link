import { Injectable } from '@nestjs/common'
import { NetworkCluster, RuleConditionType } from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { ApiNetworkService, NetworkAsset } from '@pubkey-link/api-network-data-access'
import { RuleCondition } from './entity/rule-condition.entity'

@Injectable()
export class ApiRuleResolverService {
  constructor(readonly core: ApiCoreService, readonly network: ApiNetworkService) {}

  async resolve(cluster: NetworkCluster, conditions: RuleCondition[], owner: string): Promise<RuleCondition[]> {
    // We want to loop over all the conditions, resolve them, then tack the resolved network assets onto the condition

    const result: RuleCondition[] = []

    for (const condition of conditions) {
      const resolved = await this.resolveCondition(cluster, condition, owner)
      console.log(`Resolved condition "${condition.type}" for "${owner}"`, resolved?.accounts ?? [])
      const valid = condition.amount && resolved.amount && parseInt(condition.amount) <= parseInt(resolved.amount)
      result.push({ ...condition, asset: resolved, valid: !!valid })
    }

    return result
  }

  private async resolveCondition(
    cluster: NetworkCluster,
    condition: RuleCondition,
    owner: string,
  ): Promise<NetworkAsset> {
    const { vaultId } = (condition.config ?? {}) as { vaultId?: string }
    const account = condition.account
    switch (condition.type) {
      case RuleConditionType.AnybodiesAsset:
        if (!vaultId) {
          throw new Error(`Condition ${condition.id} is Missing vaultId`)
        }
        return this.network.resolveAnybodiesAsset({ owner, vaultId })
      case RuleConditionType.SolanaFungibleAsset:
        if (!account) {
          throw new Error(`Condition ${condition.id} is Missing account`)
        }
        return this.network.resolveSolanaFungibleAsset({ cluster, account, owner })
      case RuleConditionType.SolanaNonFungibleAsset:
        if (!account) {
          throw new Error(`Condition ${condition.id} is Missing account`)
        }
        return this.network.resolveSolanaNonFungibleAsset({ cluster, account, owner })
      default:
        throw new Error(`Unknown condition type "${condition.type}" for "${condition.id}"`)
    }
  }
}
