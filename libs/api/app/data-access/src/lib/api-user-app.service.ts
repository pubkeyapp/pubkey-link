import { Injectable } from '@nestjs/common'
import { AppUserRole, UserRole } from '@prisma/client'
import { ApiCoreService, slugifyId } from '@pubkey-link/api-core-data-access'
import { UserCreateAppInput } from './dto/user-create-app.input'
import { UserFindManyAppInput } from './dto/user-find-many-app.input'
import { UserUpdateAppInput } from './dto/user-update-app.input'
import { AppPaging } from './entity/app-paging.entity'
import { getUserAppWhereInput } from './helpers/get-user-app-where.input'

@Injectable()
export class ApiUserAppService {
  constructor(private readonly core: ApiCoreService) {}

  async createApp(userId: string, input: UserCreateAppInput) {
    const name = slugifyId(input.name.trim())
    if (name.length < 3) throw new Error('Name must be at least 3 characters long')
    try {
      return this.core.data.app.create({
        data: {
          ...input,
          users: {
            create: { userId, role: AppUserRole.Admin },
          },
        },
      })
    } catch (e) {
      throw new Error(`Error creating app`)
    }
  }

  async deleteApp(userId: string, appId: string) {
    await this.ensureAppAdmin(userId, appId)
    try {
      const deleted = await this.core.data.app.delete({ where: { id: appId } })
      return !!deleted
    } catch (e) {
      throw new Error(`Error deleting app`)
    }
  }

  async findManyApp(userId: string, input: UserFindManyAppInput): Promise<AppPaging> {
    return this.core.data.app
      .paginate({
        orderBy: { createdAt: 'desc' },
        where: getUserAppWhereInput(userId, input),
        include: { users: { where: { userId } } },
      })
      .withPages({ limit: input.limit, page: input.page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOneApp(userId: string, appId: string) {
    await this.ensureAppUser(userId, appId)
    return this.core.data.app.findUnique({
      where: {
        id: appId,
        users: {
          some: {
            OR: [{ userId }, { user: { role: UserRole.Admin } }],
          },
        },
      },
      include: { users: { where: { userId } } },
    })
  }

  async updateApp(userId: string, appId: string, input: UserUpdateAppInput) {
    await this.ensureAppAdmin(userId, appId)
    const name = slugifyId(input.name?.trim() ?? '')
    if (input.name && name.length < 3) throw new Error('Name must be at least 3 characters long')
    try {
      return this.core.data.app.update({ where: { id: appId }, data: input })
    } catch (e) {
      throw new Error(`Error updating app`)
    }
  }

  private async ensureAppAdmin(userId: string, appId: string) {
    const appUser = await this.ensureAppUser(userId, appId)
    if (appUser.role !== AppUserRole.Admin && appUser.user.role !== UserRole.Admin) {
      throw new Error('Not authorized')
    }
    return appUser
  }

  private async ensureAppUser(userId: string, appId: string) {
    const appUser = await this.core.data.appUser.findUnique({
      where: { appId_userId: { appId, userId } },
      include: { app: true, user: true },
    })
    if (!appUser) {
      throw new Error('App not found')
    }
    return appUser
  }
}
