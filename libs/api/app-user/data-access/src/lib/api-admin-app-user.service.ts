import { Injectable } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { AdminCreateAppUserInput } from './dto/admin-create-app-user.input'
import { AdminFindManyAppUserInput } from './dto/admin-find-many-app-user.input'
import { AdminUpdateAppUserInput } from './dto/admin-update-app-user.input'
import { AppUserPaging } from './entity/app-user-paging.entity'
import { getAdminAppUserWhereInput } from './helpers/get-admin-app-user-where.input'

@Injectable()
export class ApiAdminAppUserService {
  constructor(private readonly core: ApiCoreService) {}

  async createAppUser(input: AdminCreateAppUserInput) {
    const appUser = await this.ensureUserAndApp(input)
    if (appUser) {
      throw new Error('User is already added to this app')
    }
    return this.core.data.appUser.create({ data: input })
  }

  async deleteAppUser(appUserId: string) {
    const deleted = await this.core.data.appUser.delete({ where: { id: appUserId } })
    return !!deleted
  }

  async findManyAppUser(input: AdminFindManyAppUserInput): Promise<AppUserPaging> {
    return this.core.data.appUser
      .paginate({
        orderBy: { createdAt: 'desc' },
        where: getAdminAppUserWhereInput(input),
        include: { user: true },
      })
      .withPages({ limit: input.limit, page: input.page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOneAppUser(appUserId: string) {
    return this.core.data.appUser.findUnique({ where: { id: appUserId } })
  }

  async updateAppUser(appUserId: string, input: AdminUpdateAppUserInput) {
    const appUser = await this.ensureUserAndApp(input)
    if (!appUser) {
      throw new Error('User does not belong to this app')
    }
    if (appUser.role === input.role) {
      throw new Error('User already has this role')
    }

    return this.core.data.appUser.update({ where: { id: appUserId }, data: input })
  }

  private async ensureUserAndApp({ appId, userId }: { appId: string; userId: string }) {
    const [app, user] = await Promise.all([
      this.core.data.app.findUnique({ where: { id: appId } }),
      this.core.data.user.findUnique({ where: { id: userId }, include: { apps: true } }),
    ])
    if (!app) {
      throw new Error(`App not found`)
    }
    if (!user) {
      throw new Error(`User not found`)
    }
    return user.apps.find((appUser) => appUser.appId === app.id)
  }
}
