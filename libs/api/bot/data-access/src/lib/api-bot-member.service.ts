import { InjectQueue } from '@nestjs/bullmq'
import { Injectable, Logger } from '@nestjs/common'
import { Bot } from '@prisma/client'

import { DiscordBot } from '@pubkey-link/api-bot-util'
import { ApiCoreService, IdentityProvider } from '@pubkey-link/api-core-data-access'
import { Queue } from 'bullmq'
import { API_BOT_MEMBER_ADD, API_BOT_MEMBER_REMOVE } from './helpers/api-bot.constants'

@Injectable()
export class ApiBotMemberService {
  private readonly logger = new Logger(ApiBotMemberService.name)

  constructor(
    @InjectQueue(API_BOT_MEMBER_ADD) private botMemberAddQueue: Queue,
    @InjectQueue(API_BOT_MEMBER_REMOVE) private botMemberRemoveQueue: Queue,
    private readonly core: ApiCoreService,
  ) {}

  async setupListeners(bot: Bot, instance: DiscordBot) {
    if (!instance.client?.user) {
      this.logger.warn(`Bot client on instance not found.`)
      return
    }
    this.logger.verbose(`Setting up listeners for bot ${bot.name}`)
    instance.client?.on('guildMemberAdd', (member) => this.scheduleAddMember(bot, member.guild.id, member.id))
    instance.client.on('guildMemberRemove', (member) => this.scheduleRemoveMember(bot, member.guild.id, member.id))
  }

  async upsert({
    botId,
    communityId,
    serverId,
    userId,
  }: {
    botId: string
    communityId: string
    serverId: string
    userId: string
  }) {
    const identity = await this.core.findUserByIdentity({
      provider: IdentityProvider.Discord,
      providerId: userId,
    })
    if (!identity) {
      await this.core.logError(communityId, `User ${userId} joined ${serverId} but identity not found`, {
        botId,
        identityProvider: IdentityProvider.Discord,
        identityProviderId: userId,
      })
      return
    }

    return this.core.data.botMember
      .upsert({
        where: { botId_userId_serverId: { botId, userId, serverId } },
        update: { botId, serverId, userId },
        create: { botId, serverId, userId },
      })
      .then(async (created) => {
        await this.core.logInfo(communityId, `Added ${userId} to ${serverId}`, {
          botId,
          identityProvider: IdentityProvider.Discord,
          identityProviderId: userId,
        })
        return created
      })
  }
  async remove({
    botId,
    communityId,
    serverId,
    userId,
  }: {
    botId: string
    communityId: string
    serverId: string
    userId: string
  }) {
    return this.core.data.botMember
      .delete({ where: { botId_userId_serverId: { botId, userId, serverId } } })
      .then((deleted) => {
        this.core.logInfo(communityId, `Removed ${userId} from ${serverId}`, {
          botId,
          identityProvider: IdentityProvider.Discord,
          identityProviderId: userId,
        })
        return deleted
      })
  }

  async getBotMemberIds(botId: string, serverId: string) {
    return this.core.data.botMember
      .findMany({ where: { botId, serverId } })
      .then((items) => items.map(({ userId }) => userId))
  }

  async getDiscordIdentityIds() {
    return this.core.data.identity
      .findMany({ where: { provider: IdentityProvider.Discord } })
      .then((items) => items.map((item) => item.providerId))
  }

  async getBotMembers(botId: string, serverId: string) {
    return this.core.data.botMember.findMany({
      where: {
        botId,
        serverId,
      },
      include: { identity: { include: { owner: true } } },
      orderBy: { identity: { owner: { username: 'asc' } } },
    })
  }

  private async scheduleAddMember(bot: Bot, serverId: string, userId: string) {
    const jobId = `${bot.id}-${serverId}-${userId}`
    await this.botMemberAddQueue
      .add('member-add', { botId: bot.id, communityId: bot.communityId, serverId, userId }, { jobId })
      .then((res) => {
        this.logger.verbose(`scheduleAddMember queued: ${res.id}`)
      })
      .catch((err) => {
        this.logger.error(`scheduleAddMember error: ${jobId}: ${err}`)
      })
  }
  private async scheduleRemoveMember(bot: Bot, serverId: string, userId: string) {
    const jobId = `${bot.id}-${serverId}-${userId}`
    await this.botMemberRemoveQueue
      .add('member-remove', { botId: bot.id, communityId: bot.communityId, serverId, userId }, { jobId })
      .then((res) => {
        this.logger.verbose(`scheduleRemoveMember queued: ${res.id}`)
      })
      .catch((err) => {
        this.logger.error(`scheduleRemoveMember error: ${jobId}: ${err}`)
      })
  }
}
