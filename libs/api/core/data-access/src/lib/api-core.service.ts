import { Injectable, Logger } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { CommunityRole, IdentityProvider, LogLevel, LogRelatedType, Prisma, User, UserRole } from '@prisma/client'
import { ApiCorePrismaClient, prismaClient } from './api-core-prisma-client'
import { ApiCoreConfigService } from './config/api-core-config.service'

import { StatRecord } from './entity/stat-record'
import { slugifyId, slugifyUsername } from './helpers/slugify-id'

@Injectable()
export class ApiCoreService {
  private readonly logger = new Logger(ApiCoreService.name)
  readonly data: ApiCorePrismaClient = prismaClient
  constructor(readonly eventEmitter: EventEmitter2, readonly config: ApiCoreConfigService) {}

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

  async ensureUserAdmin(userId: string): Promise<boolean> {
    const user = await this.findUserById(userId)
    if (user?.role !== UserRole.Admin) {
      throw new Error(`User ${userId} is not an admin`)
    }
    return user.role === UserRole.Admin
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
    username = slugifyUsername(username)
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
    if (this.config.isDevelopment) {
      this.logger.error(message, JSON.stringify(input, null, 2))
    }
    return this.log(message, { ...input, level: LogLevel.Error })
  }

  async logInfo(message: string, input?: Omit<CoreLogInput, 'level'>) {
    if (this.config.isDevelopment) {
      this.logger.log(message, JSON.stringify(input, null, 2))
    }
    return this.log(message, { ...input, level: LogLevel.Info })
  }

  async logVerbose(message: string, input?: Omit<CoreLogInput, 'level'>) {
    if (this.config.isDevelopment) {
      this.logger.verbose(message, JSON.stringify(input, null, 2))
    }
    return this.log(message, { ...input, level: LogLevel.Verbose })
  }

  async logWarning(message: string, input?: Omit<CoreLogInput, 'level'>) {
    if (this.config.isDevelopment) {
      this.logger.warn(message, JSON.stringify(input, null, 2))
    }
    return this.log(message, { ...input, level: LogLevel.Warning })
  }

  uptime() {
    return process.uptime()
  }

  async isPrivateUser(actor: User, username: string) {
    if (actor.role !== UserRole.Admin && actor.username !== username) {
      const user = await this.data.user.findUnique({ where: { username: username } })
      if (!user) {
        throw new Error(`User ${username} not found`)
      }
      return user.private
    }
    return false
  }

  async tableStats(): Promise<StatRecord[]> {
    // Get all the table counts from the database
    const tables: { name: string; value: bigint }[] = await this.data.$queryRaw(Prisma.sql`
        SELECT
          relname AS name, n_live_tup AS value
        FROM
          pg_stat_user_tables
        ORDER BY
          relname;
    `)

    return (
      tables
        // sort by value (bigint) descending
        ?.sort((a, b) => Number(b.value) - Number(a.value))
        // map to StatRecord
        ?.map(({ name, value }) => ({ name, value: value.toString() })) ?? []
    )
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
