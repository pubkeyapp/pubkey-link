import { Injectable } from '@nestjs/common'
import { CommunityRole, IdentityProvider, Prisma } from '@prisma/client'
import { ApiCoreConfigService } from './api-core-config.service'
import { ApiCorePrismaClient, prismaClient } from './api-core-prisma-client'
import { slugifyId } from './helpers/slugify-id'

@Injectable()
export class ApiCoreService {
  readonly data: ApiCorePrismaClient = prismaClient
  constructor(readonly config: ApiCoreConfigService) {}

  async createCommunity({ input, userId }: { input: Prisma.CommunityCreateInput; userId?: string }) {
    const id = slugifyId(input.name).toLowerCase()
    const found = await this.getCommunityById(id)
    if (found) {
      throw new Error(`Community ${input.name} already exists`)
    }
    return this.data.community.create({
      data: {
        ...input,
        id,
        members: input.members
          ? input.members
          : userId
          ? {
              create: {
                userId,
                role: CommunityRole.Admin,
              },
            }
          : undefined,
      },
    })
  }

  async getCommunityById(communityId: string) {
    return this.data.community.findUnique({
      where: { id: communityId },
      include: { members: true },
    })
  }

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
