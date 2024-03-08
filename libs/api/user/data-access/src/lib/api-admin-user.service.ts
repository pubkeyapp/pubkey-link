import { Injectable, Logger } from '@nestjs/common'
import { User as PrismaUser } from '@prisma/client'
import { ApiCoreService, slugifyId } from '@pubkey-link/api-core-data-access'
import { AdminFindManyUserInput } from './dto/admin-find-many-user.input'
import { AdminUpdateUserInput } from './dto/admin-update-user.input'
import { UserPaging } from './entity/user-paging.entity'
import { getAdminUserWhereInput } from './helpers/get-admin-user-where.input'

@Injectable()
export class ApiAdminUserService {
  private readonly logger = new Logger(ApiAdminUserService.name)
  constructor(private readonly core: ApiCoreService) {}

  async deleteUser(userId: string): Promise<boolean> {
    const exists = await this.findOneUser(userId)
    if (!exists) {
      throw new Error(`User ${userId} not found`)
    }

    const deleted = await this.core.data.user.delete({ where: { id: userId } })

    return !!deleted
  }

  async findManyUser(input: AdminFindManyUserInput): Promise<UserPaging> {
    return this.core.data.user
      .paginate({
        orderBy: { createdAt: 'desc' },
        where: getAdminUserWhereInput(input),
        include: { identities: { orderBy: [{ provider: 'asc' }, { providerId: 'asc' }] } },
      })
      .withPages({ limit: input.limit, page: input.page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOneUser(userId: string): Promise<PrismaUser> {
    const found = await this.core.data.user.findUnique({
      where: { id: userId },
    })
    if (!found) {
      throw new Error(`User ${userId} not found`)
    }
    return found
  }

  async updateUser(userId: string, input: AdminUpdateUserInput): Promise<PrismaUser> {
    const exists = await this.findOneUser(userId)

    if (!exists) {
      throw new Error(`User ${userId} not found`)
    }

    const newUsername = input.username ? slugifyId(input.username) : undefined
    if (newUsername && newUsername !== slugifyId(exists.username)) {
      const exists = await this.core.data.user.findUnique({
        where: { username: newUsername },
      })
      if (exists) {
        throw new Error(`User ${newUsername} already exists`)
      }
      this.logger.verbose(`Updating username ${userId} to ${newUsername}`)
    }
    return this.core.data.user.update({
      where: { id: userId },
      data: {
        ...input,
        username: newUsername,
      },
    })
  }
}
