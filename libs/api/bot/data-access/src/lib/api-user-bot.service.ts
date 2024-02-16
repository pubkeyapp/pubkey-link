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
    await this.botMember.ensureBotAdmin({ botId, userId })
    const deleted = await this.core.data.bot.delete({ where: { id: botId } })
    return !!deleted
  }

  async findOneBot(userId: string, communityId: string) {
    await this.core.ensureCommunityAccess({ communityId, userId })
    const bot = await this.core.data.bot.findUnique({
      where: { communityId },
      include: { permissions: { include: { roles: { include: { role: true } } } } },
    })
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
    const botServer = await this.core.data.botServer.findUnique({
      where: {
        botId_serverId: { botId: botId, serverId },
      },
    })
    if (!botServer) {
      throw new Error(`Bot server not found ${serverId}`)
    }
    await this.botMember.ensureBotAdmin({ botId: botServer.botId, userId })
    return botServer
  }

  async updateBot(userId: string, botId: string, input: UserUpdateBotInput) {
    await this.botMember.ensureBotAdmin({ botId, userId })
    return this.core.data.bot.update({ where: { id: botId }, data: input })
  }

  async updateBotServer(userId: string, botId: string, serverId: string, input: UserUpdateBotServerInput) {
    // This call makes sure the user is an admin of the bot
    await this.findOneBotServer(userId, botId, serverId)
    return this.core.data.botServer.update({ where: { botId_serverId: { botId, serverId } }, data: input })
  }

  async userGetBotChannels(userId: string, botId: string, serverId: string) {
    await this.botMember.ensureBotAdmin({ botId, userId })
    return this.manager.getBotChannels(botId, serverId)
  }

  async userGetBotMembers(userId: string, botId: string, serverId: string) {
    await this.botMember.ensureBotAdmin({ botId, userId })
    return this.botMember.getBotMembers(botId, serverId)
  }

  async userGetBotRoles(userId: string, botId: string, serverId: string): Promise<DiscordRole[]> {
    await this.botMember.ensureBotAdmin({ botId, userId })

    return this.manager.getBotRoles(botId, serverId)
  }

  async userGetBotServers(userId: string, botId: string): Promise<DiscordServer[]> {
    await this.botMember.ensureBotAdmin({ botId, userId })
    return this.manager.getBotServers(botId)
  }
  async userGetBotServer(userId: string, botId: string, serverId: string) {
    await this.botMember.ensureBotAdmin({ botId, userId })

    return this.manager.getBotServer(botId, serverId)
  }

  async userLeaveBotServer(userId: string, botId: string, serverId: string) {
    await this.botMember.ensureBotAdmin({ botId, userId })
    return this.manager.leaveBotServer(botId, serverId)
  }

  async userStartBot(userId: string, botId: string) {
    const bot = await this.botMember.ensureBotAdmin({ botId, userId })

    return this.manager.startBot(bot)
  }

  async userStopBot(userId: string, botId: string) {
    const bot = await this.botMember.ensureBotAdmin({ botId, userId })

    return this.manager.stopBot(bot)
  }

  async userSyncBotServer(userId: string, botId: string, serverId: string) {
    await this.botMember.ensureBotAdmin({ botId, userId })

    return this.manager.syncBotServer(botId, serverId)
  }

  async userSyncBotServerRoles(userId: string, botId: string, serverId: string) {
    await this.botMember.ensureBotAdmin({ botId, userId })

    return this.manager.syncBotServerRoles(botId, serverId)
  }

  async userTestBotServerConfig(userId: string, botId: string, serverId: string) {
    await this.botMember.ensureBotAdmin({ botId, userId })

    return this.manager.testBotServerConfig(botId, serverId)
  }
}
