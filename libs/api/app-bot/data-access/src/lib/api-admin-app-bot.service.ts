import { Injectable } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { AdminCreateAppBotInput } from './dto/admin-create-app-bot.input'
import { AdminFindManyAppBotInput } from './dto/admin-find-many-app-bot.input'
import { AdminUpdateAppBotInput } from './dto/admin-update-app-bot.input'
import { AppBotPaging } from './entity/app-bot-paging.entity'
import { getAdminAppBotWhereInput } from './helpers/get-admin-app-bot-where.input'

@Injectable()
export class ApiAdminAppBotService {
  constructor(private readonly core: ApiCoreService) {}

  async createAppBot(input: AdminCreateAppBotInput) {
    return this.core.data.appBot.create({ data: input })
  }

  async deleteAppBot(appBotId: string) {
    const deleted = await this.core.data.appBot.delete({ where: { id: appBotId } })
    return !!deleted
  }

  async findManyAppBot(input: AdminFindManyAppBotInput): Promise<AppBotPaging> {
    return this.core.data.appBot
      .paginate({
        orderBy: { createdAt: 'desc' },
        where: getAdminAppBotWhereInput(input),
      })
      .withPages({ limit: input.limit, page: input.page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOneAppBot(appBotId: string) {
    return this.core.data.appBot.findUnique({ where: { id: appBotId } })
  }

  async updateAppBot(appBotId: string, input: AdminUpdateAppBotInput) {
    return this.core.data.appBot.update({ where: { id: appBotId }, data: input })
  }
}
