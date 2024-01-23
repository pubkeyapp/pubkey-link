import { Injectable, Logger } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { AdminCreateBotInput } from './dto/admin-create-bot.input'
import { AdminFindManyBotInput } from './dto/admin-find-many-bot.input'
import { AdminUpdateBotInput } from './dto/admin-update-bot.input'
import { BotPaging } from './entity/bot-paging.entity'
import { getAdminBotWhereInput } from './helpers/get-admin-bot-where.input'
import { ApiBotManagerService } from './api-bot-manager.service'
import { User } from 'discord.js'

@Injectable()
export class ApiAdminBotService {
  private readonly logger = new Logger(ApiAdminBotService.name)
  constructor(private readonly core: ApiCoreService, private readonly manager: ApiBotManagerService) {}

  async createBot(input: AdminCreateBotInput) {
    const user: User = await this.manager.getBotUser(input.token)
    this.logger.verbose(`Creating bot ${user.username}`)
    const avatarUrl = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=1024`
    return this.core.data.bot.create({
      data: {
        id: user.id,
        avatarUrl,
        name: user.username,
        ...input,
      },
    })
  }

  async deleteBot(botId: string) {
    const deleted = await this.core.data.bot.delete({ where: { id: botId } })
    return !!deleted
  }

  async findManyBot(input: AdminFindManyBotInput): Promise<BotPaging> {
    return this.core.data.bot
      .paginate({
        orderBy: { createdAt: 'desc' },
        where: getAdminBotWhereInput(input),
      })
      .withPages({ limit: input.limit, page: input.page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOneBot(botId: string) {
    return this.core.data.bot.findUnique({ where: { id: botId } })
  }

  async updateBot(botId: string, input: AdminUpdateBotInput) {
    return this.core.data.bot.update({ where: { id: botId }, data: input })
  }
}
