import { Injectable } from '@nestjs/common'
import { IdentityProvider } from '@prisma/client'
import { ApiCoreConfigService } from './api-core-config.service'
import { ApiCorePrismaClient, prismaClient } from './api-core-prisma-client'
import { slugifyId } from './helpers/slugify-id'

@Injectable()
export class ApiCoreService {
  readonly data: ApiCorePrismaClient = prismaClient
  constructor(readonly config: ApiCoreConfigService) {}

  async findUserByIdentity({ provider, providerId }: { provider: IdentityProvider; providerId: string }) {
    return this.data.identity.findUnique({
      where: { provider_providerId: { provider, providerId } },
      include: { owner: true },
    })
  }

  async findUsername(username: string): Promise<string> {
    username = slugifyId(username)
    const exists = await this.data.user.findUnique({ where: { username } })
    if (!exists) {
      return username
    }
    const newUsername = `${username}-${Math.floor(Math.random() * 1000)}`
    return this.findUsername(newUsername)
  }

  uptime() {
    return process.uptime()
  }
}
