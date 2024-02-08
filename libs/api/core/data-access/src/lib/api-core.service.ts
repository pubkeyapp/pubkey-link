import { Injectable } from '@nestjs/common'
import { CommunityRole, IdentityProvider, LogLevel, Prisma } from '@prisma/client'
import { LogRelatedType } from '@pubkey-link/sdk'
import { ApiCorePrismaClient, prismaClient } from './api-core-prisma-client'
import { ApiCoreConfigService } from './config/api-core-config.service'
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
  private async log(communityId: string, message: string, input: CoreLogInput) {
    return this.data.log.create({ data: { ...input, message, communityId } })
  }
  async logError(communityId: string, message: string, input?: Omit<CoreLogInput, 'level'>) {
    return this.log(communityId, message, { ...input, level: LogLevel.Error })
  }

  async logInfo(communityId: string, message: string, input?: Omit<CoreLogInput, 'level'>) {
    return this.log(communityId, message, { ...input, level: LogLevel.Info })
  }

  async logWarning(communityId: string, message: string, input?: Omit<CoreLogInput, 'level'>) {
    return this.log(communityId, message, { ...input, level: LogLevel.Warning })
  }

  uptime() {
    return process.uptime()
  }
}

export interface CoreLogInput {
  botId?: string | null
  data?: Prisma.InputJsonValue
  level: LogLevel
  relatedId?: string | null
  relatedType?: LogRelatedType | null
  userId?: string | null
}
