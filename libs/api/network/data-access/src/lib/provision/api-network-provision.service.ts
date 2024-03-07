import { Injectable, Logger } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { NetworkCluster, Prisma } from '@prisma/client'
import { ApiCoreService, EVENT_APP_STARTED } from '@pubkey-link/api-core-data-access'
import { EVENT_NETWORKS_PROVISIONED } from '../api-network.events'
import { getProvisionNetworks, NetworkEndpointMap } from './api-network-provision-data'

@Injectable()
export class ApiNetworkProvisionService {
  private readonly logger = new Logger(ApiNetworkProvisionService.name)

  constructor(private readonly core: ApiCoreService) {}

  @OnEvent(EVENT_APP_STARTED)
  async onApplicationStarted() {
    await this.provisionNetworks()
  }

  private async provisionNetworks() {
    const endpoints = this.getEndpointMap()
    await Promise.all(getProvisionNetworks(endpoints).map((network) => this.provisionNetwork(network)))
    this.core.eventEmitter.emit(EVENT_NETWORKS_PROVISIONED)
  }

  private getEndpointMap(): NetworkEndpointMap {
    const map: NetworkEndpointMap = new Map<NetworkCluster, string>()
    const endpointCustom = this.core.config.solanaCustomEndpoint
    if (endpointCustom) {
      map.set(NetworkCluster.SolanaCustom, endpointCustom)
    }
    const endpointDevnet = this.core.config.solanaDevnetEndpoint
    if (endpointDevnet) {
      map.set(NetworkCluster.SolanaDevnet, endpointDevnet)
    }
    const endpointMainnet = this.core.config.solanaMainnetEndpoint
    if (endpointMainnet) {
      map.set(NetworkCluster.SolanaMainnet, endpointMainnet)
    }
    const endpointTestnet = this.core.config.solanaTestnetEndpoint
    if (endpointTestnet) {
      map.set(NetworkCluster.SolanaTestnet, endpointTestnet)
    }
    if (!map.size) {
      throw new Error('No network endpoints configured. Configure at least one network endpoint')
    }
    return map
  }

  private async provisionNetwork(input: Prisma.NetworkCreateInput) {
    const existing = await this.core.data.network.count({ where: { cluster: input.cluster } })
    if (existing < 1) {
      this.logger.verbose(
        `Creating network cluster (${input.cluster}) name = ${input.name}, endpoint = ${input.endpoint}`,
      )
      await this.core.data.network.create({ data: { ...input } })
      this.logger.verbose(`Provisioned (${input.cluster}) name = ${input.name}, endpoint = ${input.endpoint}`)
      return
    }
    this.logger.verbose(`Found network (${input.cluster}) name = ${input.name}, endpoint = ${input.endpoint}`)
  }
}
