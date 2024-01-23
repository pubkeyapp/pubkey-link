import { Injectable } from '@nestjs/common'
import { NetworkCluster, RuleCondition, RuleConditionType } from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { ApiNetworkService, NetworkAsset } from '@pubkey-link/api-network-data-access'

@Injectable()
export class ApiRuleResolverService {
  constructor(readonly core: ApiCoreService, readonly network: ApiNetworkService) {}

  async resolve(cluster: NetworkCluster, conditions: RuleCondition[], owner: string): Promise<NetworkAsset[]> {
    const result: NetworkAsset[] = []

    for (const condition of conditions) {
      const resolved = await this.resolveCondition(cluster, condition, owner)
      console.log(`Resolved condition "${condition.type}" for "${owner}"`, resolved?.accounts ?? [])

      if (resolved) {
        result.push(resolved)
      }
    }

    return result
  }

  private async resolveCondition(
    cluster: NetworkCluster,
    { account, type }: RuleCondition,
    owner: string,
  ): Promise<NetworkAsset | undefined> {
    switch (type) {
      case RuleConditionType.AnybodiesNftAssets:
        return this.network.getAnybodiesVault({ owner, vaultId: account })
      case RuleConditionType.SolanaNftAssets:
        return this.network.getSolanaNftAssets({ cluster, account, owner })
      case RuleConditionType.SolanaTokenAmount:
        return this.network.getSolanaTokenAmount({ cluster, account, owner })
      default:
        throw new Error(`Unknown condition type "${type}"`)
    }
  }
}
