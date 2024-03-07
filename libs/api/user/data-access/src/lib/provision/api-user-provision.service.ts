import { Injectable, Logger } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { LogLevel, Prisma, UserStatus } from '@prisma/client'
import { ApiCoreService, hashPassword, slugifyUsername } from '@pubkey-link/api-core-data-access'
import { provisionUsers } from './api-user-provision-data'

@Injectable()
export class ApiUserProvisionService {
  private readonly logger = new Logger(ApiUserProvisionService.name)

  constructor(private readonly core: ApiCoreService) {}

  @OnEvent('app.started')
  async onApplicationStarted() {
    if (this.core.config.databaseProvision) {
      await this.provisionUsers()
      this.logger.verbose(`Provisioned users`)
    }
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
  }
}
