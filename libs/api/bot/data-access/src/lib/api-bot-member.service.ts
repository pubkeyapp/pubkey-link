import { InjectQueue } from '@nestjs/bullmq'
import { Injectable, Logger } from '@nestjs/common'
import { Bot, CommunityRole } from '@prisma/client'

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
    instance.client?.on('guildMemberAdd', (member) =>
      this.scheduleAddMember({
        botId: bot.id,
        communityId: bot.communityId,
        serverId: member.guild.id,
        userId: member.id,
      }),
    )
    instance.client.on('guildMemberRemove', (member) =>
      this.scheduleRemoveMember({
        botId: bot.id,
        communityId: bot.communityId,
        serverId: member.guild.id,
        userId: member.id,
      }),
    )
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
      await this.core.logError(`User ${userId} joined ${serverId} but identity not found`, {
        botId,
        communityId,
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
        include: { bot: { select: { id: true, communityId: true } }, identity: { select: { ownerId: true } } },
      })
      .then(async (created) => {
        await this.core.data.communityMember.upsert({
          where: { communityId_userId: { communityId: created.bot.communityId, userId: created.identity.ownerId } },
          create: {
            communityId: created.bot.communityId,
            userId: created.identity.ownerId,
            role: CommunityRole.Member,
          },
          update: { communityId: created.bot.communityId, userId: created.identity.ownerId },
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
      .delete({
        where: { botId_userId_serverId: { botId, userId, serverId } },
        include: { bot: true, identity: { select: { ownerId: true } } },
      })
      .then(async (deleted) => {
        const botMembers = await this.core.data.botMember.findMany({ where: { botId, userId } })
        if (!botMembers.length) {
          await this.core.data.communityMember
            .delete({
              where: {
                communityId_userId: { communityId: deleted.bot.communityId, userId: deleted.identity.ownerId },
              },
            })
            .then((res) => {
              this.core.logInfo(`Removed ${res.userId} from ${res.communityId}`, {
                botId,
                communityId,
                identityProvider: IdentityProvider.Discord,
                identityProviderId: userId,
                userId: res.userId,
                relatedId: res.id,
                relatedType: 'BotMember',
              })
            })
        }
        return deleted
      })
  }

  async ensureBotAdmin({ botId, userId }: { botId: string; userId: string }) {
    const bot = await this.core.data.bot.findUnique({ where: { id: botId } })
    if (!bot) {
      throw new Error(`Bot with id ${botId} not found`)
    }
    await this.core.ensureCommunityAdmin({ userId, communityId: bot.communityId })
    return bot
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

  async getBotMembers(userId: string, botId: string, serverId: string) {
    return this.core.data.botMember.findMany({
      where: {
        botId,
        serverId,
      },
      include: { identity: { include: { owner: true } } },
      orderBy: { identity: { owner: { username: 'asc' } } },
    })
  }

  async scheduleAddMember({
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
    const jobId = `${botId}-${serverId}-${userId}`
    await this.botMemberAddQueue
      .add('member-add', { botId, communityId, serverId, userId })
      .then((res) => {
        this.logger.verbose(`scheduleAddMember queued: ${res.id}`)
      })
      .catch((err) => {
        this.logger.error(`scheduleAddMember error: ${jobId}: ${err}`)
      })
  }
  async scheduleRemoveMember({
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
    const jobId = `${botId}-${serverId}-${userId}`
    await this.botMemberRemoveQueue
      .add('member-remove', { botId, communityId, serverId, userId })
      .then((res) => {
        this.logger.verbose(`scheduleRemoveMember queued: ${res.id}`)
      })
      .catch((err) => {
        this.logger.error(`scheduleRemoveMember error: ${jobId}: ${err}`)
      })
  }
}
