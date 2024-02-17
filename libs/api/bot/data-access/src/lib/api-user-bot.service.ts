import { Injectable, Logger } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { User as DiscordUser } from 'discord.js'
import { ApiBotManagerService } from './api-bot-manager.service'
import { ApiBotMemberService } from './api-bot-member.service'
import { UserCreateBotInput } from './dto/user-create-bot.input'
import { UserUpdateBotServerInput } from './dto/user-update-bot-server.input'
import { UserUpdateBotInput } from './dto/user-update-bot.input'
import { DiscordRole, DiscordServer } from './entity/discord-server.entity'

@Injectable()
export class ApiUserBotService {
  private readonly logger = new Logger(ApiUserBotService.name)
  constructor(
    private readonly core: ApiCoreService,
    private readonly manager: ApiBotManagerService,
    private readonly botMember: ApiBotMemberService,
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
    await this.ensureBotAdmin({ botId, userId })
    const deleted = await this.core.data.bot.delete({ where: { id: botId } })
    return !!deleted
  }

  async findOneBot(userId: string, communityId: string) {
    await this.core.ensureCommunityAccess({ communityId, userId })
    const bot = await this.core.data.bot.findUnique({ where: { communityId } })
    if (!bot) {
      return null
    }
    const instance = this.manager.getBotInstance(bot.id)

    if (!instance) {
      return bot
    }
    try {
      const application = await instance.getApplication()
      return { ...bot, application }
    } catch (error) {
      this.logger.error(`Error getting bot instance ${bot.id}`, error)
      return bot
    }
  }

  async findOneBotServer(userId: string, botId: string, serverId: string) {
    const botServer = await this.manager.ensureBotServer({ botId, serverId })

    await this.ensureBotAdmin({ botId: botServer.botId, userId })
    return botServer
  }

  async updateBot(userId: string, botId: string, input: UserUpdateBotInput) {
    await this.ensureBotAdmin({ botId, userId })
    return this.core.data.bot.update({ where: { id: botId }, data: input })
  }

  async updateBotServer(userId: string, botId: string, serverId: string, input: UserUpdateBotServerInput) {
    // This call makes sure the user is an admin of the bot
    await this.findOneBotServer(userId, botId, serverId)
    return this.core.data.botServer.update({ where: { botId_serverId: { botId, serverId } }, data: input })
  }

  async userGetBotChannels(userId: string, botId: string, serverId: string) {
    await this.ensureBotAdmin({ botId, userId })
    return this.manager.getBotChannels(botId, serverId)
  }

  async userGetBotRoles(userId: string, botId: string, serverId: string): Promise<DiscordRole[]> {
    await this.ensureBotAdmin({ botId, userId })

    return this.manager.getBotRoles(botId, serverId)
  }

  async userGetBotServers(userId: string, botId: string): Promise<DiscordServer[]> {
    await this.ensureBotAdmin({ botId, userId })
    return this.manager.getBotServers(botId)
  }
  async userGetBotServer(userId: string, botId: string, serverId: string) {
    await this.ensureBotAdmin({ botId, userId })

    return this.manager.getBotServer(botId, serverId)
  }

  async userLeaveBotServer(userId: string, botId: string, serverId: string) {
    await this.ensureBotAdmin({ botId, userId })
    return this.manager.leaveBotServer(botId, serverId)
  }

  async userStartBot(userId: string, botId: string) {
    const bot = await this.ensureBotAdmin({ botId, userId })

    return this.manager.startBot(bot)
  }

  async userStopBot(userId: string, botId: string) {
    const bot = await this.ensureBotAdmin({ botId, userId })

    return this.manager.stopBot(bot)
  }

  async userSyncBotServer(userId: string, botId: string, serverId: string) {
    await this.ensureBotAdmin({ botId, userId })

    return this.manager.syncBotServer(botId, serverId)
  }

  async userTestBotServerConfig(userId: string, botId: string, serverId: string) {
    await this.ensureBotAdmin({ botId, userId })

    return this.manager.testBotServerConfig(botId, serverId)
  }

  private async ensureBotAdmin({ botId, userId }: { botId: string; userId: string }) {
    const bot = await this.core.data.bot.findUnique({ where: { id: botId }, include: { community: true } })
    if (!bot) {
      throw new Error(`Bot with id ${botId} not found`)
    }
    await this.core.ensureCommunityAdmin({ userId, communityId: bot.communityId })
    return bot
  }

  async userFindManyBotRoles(userId: string, botId: string, serverId?: string) {
    await this.ensureBotAdmin({ botId, userId })

    return this.core.data.botRole.findMany({
      where: { botId, serverId: serverId ?? undefined },
      include: { permissions: { include: { role: true } } },
    })
  }
}
