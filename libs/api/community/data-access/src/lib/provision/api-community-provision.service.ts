import { Injectable, Logger } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { Network, NetworkCluster, Prisma } from '@prisma/client'
import { ApiCoreService, slugifyId } from '@pubkey-link/api-core-data-access'
import { EVENT_NETWORKS_PROVISIONED } from '@pubkey-link/api-network-data-access'
import { EVENT_COMMUNITIES_PROVISIONED } from '../api-community.events'
import { provisionCommunities } from './api-community-provision-data'

@Injectable()
export class ApiCommunityProvisionService {
  private readonly logger = new Logger(ApiCommunityProvisionService.name)

  constructor(private readonly core: ApiCoreService) {}

  @OnEvent(EVENT_NETWORKS_PROVISIONED)
  async onApplicationStarted(networks: Network[]) {
    if (this.core.config.databaseProvision) {
      await this.provisionCommunities({ clusters: networks.map((n) => n.cluster) })
      this.logger.verbose(`Provisioned communities`)
    }
  }

  private async provisionCommunities({ clusters }: { clusters: NetworkCluster[] }) {
    const communities = provisionCommunities.filter((c) => clusters.includes(c.cluster))
    if (!communities) {
      return
    }
    await Promise.all(communities.map((community) => this.provisionCommunity(community)))
    this.core.eventEmitter.emit(EVENT_COMMUNITIES_PROVISIONED)
  }

  private async provisionCommunity(input: Prisma.CommunityCreateInput) {
    const found = await this.core.getCommunityById(slugifyId(input.name).toLowerCase())
    if (!found) {
      await this.core.createCommunity({ input }).then((community) => {
        this.core.logInfo(`Provisioned Community ${input.name}`, { communityId: community.id })
      })
      return
    }
  }
}
