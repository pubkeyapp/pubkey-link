import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { LogLevel, Prisma, UserStatus } from '@prisma/client'
import { fakeUsers, provisionCommunities, provisionUsers } from './api-core-provision-data'
import { provisionNetworks } from './api-core-provision-data-networks'
import { ApiCoreService } from './api-core.service'
import { hashPassword } from './helpers/hash-validate-password'
import { slugifyId, slugifyUsername } from './helpers/slugify-id'

@Injectable()
export class ApiCoreProvisionService implements OnModuleInit {
  private readonly logger = new Logger(ApiCoreProvisionService.name)

  constructor(private readonly core: ApiCoreService) {}

  async onModuleInit() {
    if (this.core.config.databaseReset) {
      await this.resetDatabase()
      this.logger.verbose(`Reset database`)
    }
    if (this.core.config.databaseProvision) {
      await this.provisionDatabase()
      this.logger.verbose(`Provisioned database`)
    }
    if (this.core.config.databaseReset && this.core.config.databaseRandomData) {
      await this.generateRandomData()
      this.logger.verbose(`Generated random data`)
    }
  }

  private async generateRandomData() {
    await Promise.all(fakeUsers(42).map((user) => this.provisionUser(user)))
  }

  private async provisionDatabase() {
    await this.provisionNetworks()
    await this.provisionUsers()
    await this.provisionCommunities()
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
      return
    }
    this.logger.verbose(`Found network (${input.cluster}) name = ${input.name}, endpoint = ${input.endpoint}`)
  }

  private async provisionCommunities() {
    await Promise.all(provisionCommunities.map((community) => this.provisionCommunity(community)))
  }

  private async provisionCommunity(input: Prisma.CommunityCreateInput) {
    const found = await this.core.getCommunityById(slugifyId(input.name).toLowerCase())
    if (!found) {
      await this.core.createCommunity({ input })
      this.logger.verbose(`Provisioned Community ${input.name}`)
      return
    }
    this.logger.verbose(`Community ${input.name} already exists`)
  }

  private async provisionUsers() {
    await Promise.all(provisionUsers.map((user) => this.provisionUser(user)))
  }

  private async provisionUser(input: Prisma.UserCreateInput) {
    const username = slugifyUsername(input.username)
    const existing = await this.core.data.user.count({ where: { username } })
    if (existing < 1) {
      const identities = (input.identities?.create as Prisma.IdentityCreateInput[]) ?? []
      await this.core.data.user.create({
        data: {
          ...input,
          id: username,
          password: input.password ? hashPassword(input.password) : undefined,
          status: input.status ?? UserStatus.Active,
          logs: {
            create: [
              {
                message: `Provisioned ${input.role} ${input.username} with ${identities?.length} identities`,
                level: LogLevel.Info,
              },
              ...(identities.length
                ? [
                    ...identities.map((identity) => ({
                      message: `Provisioned ${identity.provider} identity ${identity.providerId}`,
                      level: LogLevel.Info,
                      identityProvider: identity.provider,
                      identityProviderId: identity.providerId,
                    })),
                  ]
                : []),
            ],
          },
        },
        include: { logs: true },
      })
      this.logger.verbose(
        `Provisioned ${input.role} ${input.username} ${input.password ? 'and password' : 'and external provider'}`,
      )
      return
    }
    this.logger.verbose(
      `Log in with ${input.role} ${input.username} ${input.password ? 'and password' : 'an external provider'}`,
    )
  }

  private async resetDatabase() {
    await this.core.data.identityChallenge.deleteMany()
    await this.core.data.identity.deleteMany()
    await this.core.data.user.deleteMany()
  }
}
