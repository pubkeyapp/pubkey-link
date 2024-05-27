import { Injectable, Logger } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { ApiBotDataService } from './api-bot-data.service'
import { ApiBotInstancesService } from './api-bot-instances.service'
import { ApiBotSyncService } from './api-bot-sync.service'
import { UserCreateBotInput } from './dto/user-create-bot.input'
import { UserUpdateBotServerInput } from './dto/user-update-bot-server.input'
import { UserUpdateBotInput } from './dto/user-update-bot.input'
import { DiscordRole, DiscordServer } from './entity/discord-server.entity'

@Injectable()
export class ApiBotDataUserService {
  private readonly logger = new Logger(ApiBotDataUserService.name)

  constructor(
    private readonly core: ApiCoreService,
    private readonly data: ApiBotDataService,
    private readonly instances: ApiBotInstancesService,
    private readonly sync: ApiBotSyncService,
  ) {}

  async createBot(userId: string, input: UserCreateBotInput) {
    await this.core.ensureCommunityAdmin({ communityId: input.communityId, userId })

    return this.data.create(input)
  }

  async deleteBot(userId: string, botId: string) {
    await this.ensureBotAdmin({ botId, userId })

    return this.data.delete(botId)
  }

  async findOneBot(userId: string, communityId: string) {
    await this.core.ensureCommunityAccess({ communityId, userId })
    const bot = await this.data.findByCommunityId(communityId)
    if (!bot) {
      return null
    }
    const instance = this.instances.getBotInstance(bot.id)

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
    const botServer = await this.instances.ensureBotServer({ botId, serverId })

    await this.ensureBotAdmin({ botId: botServer.botId, userId })
    return botServer
  }

  async updateBot(userId: string, botId: string, input: UserUpdateBotInput) {
    await this.ensureBotAdmin({ botId, userId })

    return this.data.update(botId, input)
  }

  async updateBotServer(userId: string, botId: string, serverId: string, input: UserUpdateBotServerInput) {
    await this.findOneBotServer(userId, botId, serverId)

    return this.core.data.botServer.update({ where: { botId_serverId: { botId, serverId } }, data: input })
  }

  async userGetBotChannels(userId: string, botId: string, serverId: string) {
    await this.ensureBotAdmin({ botId, userId })

    return this.instances.getBotChannels(botId, serverId)
  }

  async userGetBotRoles(userId: string, botId: string, serverId: string): Promise<DiscordRole[]> {
    await this.ensureBotAdmin({ botId, userId })

    return this.instances.getBotRoles({ botId, serverId }).then((res) => res.discordRoles)
  }

  async userGetBotServers(userId: string, botId: string): Promise<DiscordServer[]> {
    await this.ensureBotAdmin({ botId, userId })

    return this.instances.getBotServers(botId)
  }

  async userGetBotServer(userId: string, botId: string, serverId: string) {
    await this.ensureBotAdmin({ botId, userId })

    return this.instances.getBotServer({ botId, serverId })
  }

  async userLeaveBotServer(userId: string, botId: string, serverId: string) {
    await this.ensureBotAdmin({ botId, userId })

    return this.instances.leaveBotServer(botId, serverId)
  }

  async userStartBot(userId: string, botId: string) {
    const bot = await this.ensureBotAdmin({ botId, userId })

    return this.instances.startBot(bot)
  }

  async userStopBot(userId: string, botId: string) {
    const bot = await this.ensureBotAdmin({ botId, userId })

    return this.instances.stopBot(bot)
  }

  async userSyncBotServer(userId: string, botId: string, serverId: string) {
    await this.ensureBotAdmin({ botId, userId })

    return this.sync.syncBotServer({ botId, serverId })
  }

  async userTestBotServerConfig(userId: string, botId: string, serverId: string) {
    await this.ensureBotAdmin({ botId, userId })

    return this.instances.testBotServerConfig({ userId, botId, serverId })
  }

  async userFindManyBotRoles(userId: string, botId: string, serverId: string) {
    await this.ensureBotAdmin({ botId, userId })

    return this.core.data.botRole.findMany({
      where: { botId, serverId },
      include: { permissions: { include: { role: true } } },
    })
  }

  private async ensureBotAdmin({ botId, userId }: { botId: string; userId: string }) {
    const bot = await this.data.findOne(botId)
    if (!bot) {
      throw new Error(`Bot with id ${botId} not found`)
    }
    await this.core.ensureCommunityAdmin({ userId, communityId: bot.communityId })
    return bot
  }
}
