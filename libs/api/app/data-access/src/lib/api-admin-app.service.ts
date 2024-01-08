import { Injectable } from '@nestjs/common'
import { ApiCoreService, slugifyId } from '@pubkey-link/api-core-data-access'
import { AppUserRole } from '@pubkey-link/sdk'
import { AdminCreateAppInput } from './dto/admin-create-app.input'
import { AdminFindManyAppInput } from './dto/admin-find-many-app.input'
import { AdminUpdateAppInput } from './dto/admin-update-app.input'
import { AppPaging } from './entity/app-paging.entity'
import { getAdminAppWhereInput } from './helpers/get-admin-app-where.input'

@Injectable()
export class ApiAdminAppService {
  constructor(private readonly core: ApiCoreService) {}

  async createApp(userId: string, input: AdminCreateAppInput) {
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

  async deleteApp(appId: string) {
    try {
      const deleted = await this.core.data.app.delete({ where: { id: appId } })
      return !!deleted
    } catch (e) {
      throw new Error(`Error deleting app`)
    }
  }

  async findManyApp(input: AdminFindManyAppInput): Promise<AppPaging> {
    return this.core.data.app
      .paginate({
        orderBy: { createdAt: 'desc' },
        where: getAdminAppWhereInput(input),
      })
      .withPages({ limit: input.limit, page: input.page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOneApp(appId: string) {
    return this.core.data.app.findUnique({ where: { id: appId } })
  }

  async updateApp(appId: string, input: AdminUpdateAppInput) {
    const name = slugifyId(input.name?.trim() ?? '')
    if (input.name && name.length < 3) throw new Error('Name must be at least 3 characters long')
    try {
      return this.core.data.app.update({ where: { id: appId }, data: input })
    } catch (e) {
      throw new Error(`Error updating app`)
    }
  }
}
