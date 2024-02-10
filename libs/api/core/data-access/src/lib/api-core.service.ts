import { Injectable } from '@nestjs/common'
import { CommunityRole, IdentityProvider, LogLevel, LogRelatedType, Prisma, UserRole } from '@prisma/client'
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

  async ensureCommunityAccess({
    communityId,
    userId,
  }: {
    communityId: string
    userId: string
  }): Promise<CommunityRole> {
    const user = await this.findUserById(userId)
    if (!user) {
      throw new Error(`User ${userId} not found`)
    }
    // Admins have Admin role in all communities
    if (user.role === UserRole.Admin) {
      return CommunityRole.Admin
    }
    const found = await this.data.communityMember.findUnique({
      where: { communityId_userId: { communityId, userId } },
    })
    if (!found) {
      throw new Error(`User ${userId} is not a member of community ${communityId}`)
    }
    return found.role
  }

  async ensureCommunityAdmin({ communityId, userId }: { communityId: string; userId: string }): Promise<boolean> {
    const role = await this.ensureCommunityAccess({ communityId, userId })
    if (role !== CommunityRole.Admin) {
      throw new Error(`User ${userId} is not an admin of community ${communityId}`)
    }
    return role === CommunityRole.Admin
  }

  async ensureUserById(userId: string) {
    const found = await this.findUserById(userId)
    if (!found) {
      throw new Error(`User ${userId} not found`)
    }
    return found
  }

  async getCommunityById(communityId: string) {
    return this.data.community.findUnique({
      where: { id: communityId },
      include: { members: true },
    })
  }

  async getSolanaIdentities({ username }: { username: string }): Promise<string[]> {
    return this.data.identity
      .findMany({
        where: { provider: IdentityProvider.Solana, owner: { username } },
        select: { providerId: true },
      })
      .then((identities) => identities.map((identity) => identity.providerId))
  }

  async findUserByIdentity({ provider, providerId }: { provider: IdentityProvider; providerId: string }) {
    return this.data.identity.findUnique({
      where: { provider_providerId: { provider, providerId } },
      include: { owner: true },
    })
  }

  async findUserById(userId: string) {
    return this.data.user.findUnique({ where: { id: userId } })
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

  private async log(message: string, input: CoreLogInput) {
    return this.data.log.create({ data: { ...input, message } })
  }
  async logError(message: string, input?: Omit<CoreLogInput, 'level'>) {
    return this.log(message, { ...input, level: LogLevel.Error })
  }

  async logInfo(message: string, input?: Omit<CoreLogInput, 'level'>) {
    return this.log(message, { ...input, level: LogLevel.Info })
  }

  async logVerbose(message: string, input?: Omit<CoreLogInput, 'level'>) {
    return this.log(message, { ...input, level: LogLevel.Verbose })
  }

  async logWarning(message: string, input?: Omit<CoreLogInput, 'level'>) {
    return this.log(message, { ...input, level: LogLevel.Warning })
  }

  uptime() {
    return process.uptime()
  }
}

export interface CoreLogInput {
  botId?: string | null
  communityId?: string | null
  data?: Prisma.InputJsonValue
  identityProvider?: IdentityProvider | null
  identityProviderId?: string | null
  level: LogLevel
  relatedId?: string | null
  relatedType?: LogRelatedType | null
  roleId?: string | null
  userId?: string | null
}
