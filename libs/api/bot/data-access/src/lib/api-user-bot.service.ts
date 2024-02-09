import { Injectable, Logger } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { User as DiscordUser } from 'discord.js'
import { ApiBotManagerService } from './api-bot-manager.service'
import { ApiBotMemberService } from './api-bot-member.service'
import { UserCreateBotInput } from './dto/user-create-bot.input'
import { UserUpdateBotInput } from './dto/user-update-bot.input'

@Injectable()
export class ApiUserBotService {
  private readonly logger = new Logger(ApiUserBotService.name)
  constructor(
    private readonly core: ApiCoreService,
    private readonly manager: ApiBotManagerService,
    private readonly member: ApiBotMemberService,
  ) {}

  async createBot(userId: string, input: UserCreateBotInput) {
    await this.core.ensureCommunityAdmin({ communityId: input.communityId, userId })
    const bot: DiscordUser = await this.manager.getBotUser(input.token)
    this.logger.verbose(`Creating bot ${bot.username}`)
    const avatarUrl = `https://cdn.discordapp.com/avatars/${bot.id}/${bot.avatar}.png?size=1024`
    return this.core.data.bot.create({
      data: {
        id: bot.id,
        avatarUrl,
        name: bot.username,
        ...input,
      },
    })
  }

  async deleteBot(userId: string, botId: string) {
    await this.member.ensureBotAdmin({ botId, userId })
    const deleted = await this.core.data.bot.delete({ where: { id: botId } })
    return !!deleted
  }

  async findOneBot(userId: string, communityId: string) {
    await this.core.ensureCommunityAccess({ communityId, userId })
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

  async updateBot(userId: string, botId: string, input: UserUpdateBotInput) {
    await this.member.ensureBotAdmin({ botId, userId })
    return this.core.data.bot.update({ where: { id: botId }, data: input })
  }
}
