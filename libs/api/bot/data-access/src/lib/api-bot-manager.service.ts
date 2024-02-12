import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { Bot } from '@prisma/client'

import { createDiscordRestClient, DiscordBot } from '@pubkey-link/api-bot-util'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'

import { PermissionsString, User } from 'discord.js'
import { ApiBotMemberService } from './api-bot-member.service'
import { BotStatus } from './entity/bot-status.enum'
import { DiscordRole, DiscordServer } from './entity/discord-server.entity'

@Injectable()
export class ApiBotManagerService implements OnModuleInit {
  private readonly logger = new Logger(ApiBotManagerService.name)
  private readonly bots = new Map<string, DiscordBot>()

  constructor(private readonly core: ApiCoreService, private readonly botMember: ApiBotMemberService) {}

  async onModuleInit() {
    const bots = await this.core.data.bot.findMany({ where: { status: BotStatus.Active } })
    for (const bot of bots) {
      this.logger.verbose(`Starting bot ${bot.name}`)
      await this.startBot(bot)
    }
  }

  async getBotUser(token: string) {
    const client = createDiscordRestClient(token)
    const user: User = (await client.get('/users/@me')) as User
    if (!user) {
      throw new Error('Invalid token')
    }
    this.logger.verbose(`getBotUser ${user.username}`)
    return user
  }

  isStarted(botId: string) {
    return !!this.bots.get(botId)
  }

  developersUrl(botId: string) {
    return `https://discord.com/developers/applications/${botId}`
  }

  async getBotRoles(userId: string, botId: string, serverId: string): Promise<DiscordRole[]> {
    const bot = this.getBotInstance(botId)
    if (!bot) {
      return []
    }
    return bot.getRoles(serverId)
  }

  async getBotServers(userId: string, botId: string): Promise<DiscordServer[]> {
    const bot = this.getBotInstance(botId)

    if (!bot) {
      return []
    }

    const servers = await bot.client?.guilds.fetch()
    if (!servers) {
      return []
    }

    return servers.map((server) => ({
      id: server.id,
      name: server.name,
      icon: server.iconURL(),
      permissions: convertPermissions(server.permissions.serialize()),
    }))
  }

  async getBotRole(botId: string, serverId: string, roleId: string): Promise<DiscordRole | undefined> {
    try {
      const bot = this.getBotInstance(botId)
      if (!bot) {
        return undefined
      }
      const role = await bot.getRole(serverId, roleId)
      if (!role) {
        return undefined
      }
      return role
    } catch (e) {
      console.error(e)
      return undefined
    }
  }

  async getBotServer(botId: string, serverId: string): Promise<DiscordServer | undefined> {
    try {
      const bot = this.getBotInstance(botId)
      if (!bot) {
        return undefined
      }
      const server = await bot.client?.guilds.fetch({ guild: serverId })

      if (!server) {
        return undefined
      }

      return {
        id: server.id,
        name: server.name,
        icon: server.iconURL(),
      }
    } catch (e) {
      console.error(e)
      return undefined
    }
  }

  inviteUrl(botId: string) {
    const url = new URL('https://discord.com/api/oauth2/authorize')
    url.searchParams.append('client_id', botId)
    url.searchParams.append('permissions', '268435456')
    // url.searchParams.append('permissions', '268437504')
    url.searchParams.append('scope', ' bot role_connections.write')
    url.searchParams.append('redirect_uri', this.redirectUrl(botId))
    url.searchParams.append('response_type', 'code')

    return url.toString()
  }

  async leaveBotServer(userId: string, botId: string, serverId: string) {
    return this.ensureBotInstance(botId).leaveServer(serverId)
  }

  redirectUrl(botId: string) {
    return this.core.config.authDiscordStrategyOptions.callbackURL + `?botId=${botId}`
    // return `${this.core.config.apiUrl}/bot/${botId}/callback`
  }

  async userStartBot(userId: string, botId: string) {
    const bot = await this.botMember.ensureBotAdmin({ botId, userId })

    return this.startBot(bot)
  }

  async userStopBot(userId: string, botId: string) {
    const bot = await this.botMember.ensureBotAdmin({ botId, userId })

    return this.stopBot(bot)
  }

  private async startBot(bot: Bot) {
    if (this.bots.get(bot.id)) {
      throw new Error(`Bot ${bot.name} already started`)
    }

    const instance = new DiscordBot({ botId: bot.id, token: bot.token })
    await instance.start()
    await this.botMember.setupListeners(bot, instance)
    this.bots.set(bot.id, instance)

    return true
  }

  private async stopBot(bot: Bot) {
    const instance = this.bots.get(bot.id)
    if (!instance) {
      throw new Error(`Bot ${bot.name} not started`)
    }
    await instance.stop()
    this.bots.delete(bot.id)

    return true
  }

  verificationUrl(botId: string) {
    return `${this.core.config.webUrl}/bot/${botId}/verification`
  }

  getBotInstance(botId: string): DiscordBot | undefined {
    return this.bots.get(botId)
  }

  ensureBotInstance(botId: string) {
    const instance = this.bots.get(botId)
    if (!instance) {
      throw new Error(`Bot ${botId} not started`)
    }
    return instance
  }

  async syncBotServer(userId: string, botId: string, serverId: string) {
    const community = await this.core.data.community.findFirst({
      where: { bot: { id: botId } },
      include: { bot: true },
    })
    if (!community?.bot) {
      console.log(`Can't find community.`, botId, serverId)
      return false
    }
    await this.core.ensureCommunityAdmin({ userId, communityId: community.id })
    await this.syncBotServerMembers({
      communityId: community.id,
      botId,
      serverId,
    })
    return true
  }

  @Cron(CronExpression.EVERY_MINUTE)
  private async syncBotServers() {
    const bots = await this.core.data.bot.findMany({ where: { status: BotStatus.Active } })

    for (const bot of bots) {
      const servers = await this.getBotServers('-no-user-id-', bot.id)
      for (const server of servers) {
        await this.ensureBotServer({ bot, server })
        await this.syncBotServerMembers({ botId: bot.id, communityId: bot.communityId, serverId: server.id })
      }
    }
    return bots
  }

  private async ensureBotServer({ bot, server }: { bot: Bot; server: DiscordServer }) {
    const found = await this.core.data.botServer.findUnique({
      where: { botId_serverId: { botId: bot.id, serverId: server.id } },
    })
    if (!found) {
      this.logger.verbose(`Creating bot server ${server.name}`)
      return this.core.data.botServer.create({
        data: {
          bot: { connect: { id: bot.id } },
          serverId: server.id,
          name: server.name,
        },
      })
    }
    return found
  }
  async syncBotServerMembers({
    botId,
    communityId,
    serverId,
  }: {
    botId: string
    communityId: string
    serverId: string
  }) {
    const discordBot = this.ensureBotInstance(botId)
    if (!discordBot) {
      console.log(`Can't find bot.`, botId, serverId)
      return false
    }
    const tag = `[${discordBot.client?.user?.username}] syncBotServerMembers (${serverId})`

    const [discordIdentityIds, botMemberIds] = await Promise.all([
      this.botMember.getDiscordIdentityIds(),
      this.botMember.getBotMemberIds(botId, serverId),
    ])
    const members = await discordBot.getDiscordServerMembers(serverId)

    const filtered = members
      // We only want to process members that have a discord identity
      .filter((member) => discordIdentityIds.includes(member.id))
      // We don't want to process members that are already in the database
      .filter((member) => !botMemberIds.includes(member.id))

    if (!filtered.length) {
      this.logger.verbose(`${tag}: No members to process (filtered ${members.length} members)`)
      return true
    }

    const toBeDeleted = botMemberIds.filter((id) => !members.find((member) => member.id === id))

    if (toBeDeleted.length) {
      this.logger.warn(`${tag}: Found ${toBeDeleted.length} members to delete`)
      for (const userId of toBeDeleted) {
        this.logger.verbose(`${tag}: Removing member ${userId} from bot ${botId} server ${serverId}...`)
        await this.botMember.scheduleRemoveMember({ communityId, botId, serverId, userId })
      }
    }

    let linkedCount = 0
    if (filtered.length) {
      this.logger.verbose(`${tag}: Found ${filtered.length} members to process`)
      for (const member of filtered) {
        const userId = member.id
        await this.botMember.scheduleAddMember({ communityId, botId: botId, serverId, userId })
        if (member.id) {
          linkedCount++
        }
      }
    }
    if (!linkedCount) {
      return true
    }
    await this.core.logVerbose(
      `Found ${members.length} members to process (filtered ${filtered.length}) (linked ${linkedCount})`,
      {
        botId,
        communityId,
      },
    )
    this.logger.verbose(
      `${tag}: Found ${members.length} members to process (filtered ${filtered.length}) (linked ${linkedCount})`,
    )
    return true
  }
}

function convertPermissions(permissions: Record<PermissionsString, boolean>) {
  return (Object.keys(permissions) as PermissionsString[]).filter((key) => permissions[key] === true)
}
