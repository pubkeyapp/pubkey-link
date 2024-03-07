import { Injectable, Logger } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { Prisma } from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { provisionNetworks } from './api-network-provision-data'

@Injectable()
export class ApiNetworkProvisionService {
  private readonly logger = new Logger(ApiNetworkProvisionService.name)

  constructor(private readonly core: ApiCoreService) {}

  @OnEvent('app.started')
  async onApplicationStarted() {
    await this.provisionNetworks()
  }

  private async provisionNetworks() {
    await Promise.all(provisionNetworks.map((network) => this.provisionNetwork(network)))
  }

  private async provisionNetwork(input: Prisma.NetworkCreateInput) {
    const existing = await this.core.data.network.count({ where: { cluster: input.cluster } })
    if (existing < 1) {
      this.logger.verbose(
        `Creating network cluster (${input.cluster}) name = ${input.name}, endpoint = ${input.endpoint}`,
      )
      await this.core.data.network.create({ data: { ...input } })
      this.logger.verbose(`Provisioned (${input.cluster}) name = ${input.name}, endpoint = ${input.endpoint}`)
      this.core.eventEmitter.emit('network.provisioned', input)
      return
    }
    this.logger.verbose(`Found network (${input.cluster}) name = ${input.name}, endpoint = ${input.endpoint}`)
    this.core.eventEmitter.emit('network.provisioned', input)
  }
}
