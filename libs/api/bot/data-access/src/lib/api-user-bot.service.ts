import { Injectable, Logger } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { User } from 'discord.js'
import { UserCreateBotInput } from './dto/user-create-bot.input'
import { UserUpdateBotInput } from './dto/user-update-bot.input'
import { ApiBotManagerService } from './api-bot-manager.service'

@Injectable()
export class ApiUserBotService {
  private readonly logger = new Logger(ApiUserBotService.name)
  constructor(private readonly core: ApiCoreService, private readonly manager: ApiBotManagerService) {}

  async createBot(input: UserCreateBotInput) {
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

  async findOneBot(communityId: string) {
    const bot = await this.core.data.bot.findUnique({
      where: { communityId },
      include: { permissions: { include: { rules: { include: { rule: true } } } } },
    })
    if (!bot) {
      return null
    }
    const instance = this.manager.getBotInstance(bot.id)

    if (!instance) {
      return bot
    }

    const application = await instance.getApplication()

    return { ...bot, application }
  }

  async updateBot(botId: string, input: UserUpdateBotInput) {
    return this.core.data.bot.update({ where: { id: botId }, data: input })
  }
}
