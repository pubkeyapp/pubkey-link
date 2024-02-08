import { Injectable, Logger, OnModuleInit } from '@nestjs/common'

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
      await this.startBot(bot.id)
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

  async getBotRoles(botId: string, serverId: string): Promise<DiscordRole[]> {
    const bot = this.getBotInstance(botId)
    if (!bot) {
      return []
    }
    return bot.getRoles(serverId)
  }

  async getBotServers(botId: string): Promise<DiscordServer[]> {
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
    const bot = this.getBotInstance(botId)
    if (!bot) {
      return undefined
    }
    return bot.getRole(serverId, roleId)
  }

  async getBotServer(botId: string, serverId: string): Promise<DiscordServer | undefined> {
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

  async leaveBotServer(botId: string, serverId: string) {
    return this.ensureBotInstance(botId).leaveServer(serverId)
  }

  redirectUrl(botId: string) {
    return this.core.config.authDiscordStrategyOptions.callbackURL + `?botId=${botId}`
    // return `${this.core.config.apiUrl}/bot/${botId}/callback`
  }

  async startBot(botId: string) {
    const bot = await this.core.data.bot.findUnique({ where: { id: botId } })
    if (!bot) {
      throw new Error(`Bot with id ${botId} not found`)
    }
    if (this.bots.get(bot.id)) {
      throw new Error(`Bot ${bot.name} already started`)
    }

    const instance = new DiscordBot({ botId, token: bot.token })
    await instance.start()
    await this.botMember.setupListeners(bot, instance)
    this.bots.set(bot.id, instance)

    return true
  }

  async stopBot(botId: string) {
    const bot = await this.core.data.bot.findUnique({ where: { id: botId } })
    if (!bot) {
      throw new Error(`Bot with id ${botId} not found`)
    }
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

  async syncBotServer(botId: string, serverId: string) {
    const bot = this.ensureBotInstance(botId)
    if (!bot) {
      console.log(`Can't find bot.`, botId, serverId)
      return false
    }
    const community = await this.core.data.community.findFirst({ where: { bot: { id: botId } } })
    if (!community) {
      console.log(`Can't find community.`, botId, serverId)
      return false
    }
    this.logger.verbose(`Fetching members... ${botId} ${serverId}`)

    const [discordIdentityIds, botMemberIds] = await Promise.all([
      this.botMember.getDiscordIdentityIds(),
      this.botMember.getBotMemberIds(botId, serverId),
    ])
    const members = await bot.getDiscordServerMembers(serverId)

    this.logger.verbose(`Found ${members.length} members to process`)
    const filtered = members
      // We only want to process members that have a discord identity
      .filter((member) => discordIdentityIds.includes(member.id))
      // We don't want to process members that are already in the database
      .filter((member) => !botMemberIds.includes(member.id))

    const toBeDeleted = botMemberIds.filter((id) => !members.find((member) => member.id === id))

    if (toBeDeleted.length) {
      this.logger.warn(`Found ${toBeDeleted.length} members to delete`)
      this.logger.warn(`TODO: DELETE MEMBERS`)
    }

    this.logger.verbose(`Found ${filtered.length} members to process (filtered)`)
    let linkedCount = 0
    for (const member of filtered) {
      const userId = member.id
      // const identityProviderId = discordIdentityIds.includes(member.id) ? member.id : undefined
      const created = await this.botMember.upsert({ botId, communityId: community.id, serverId, userId })
      if (!created) {
        this.logger.warn(`Failed to create bot member ${botId} ${serverId} ${userId}`)
        continue
      }

      await this.core.logInfo(
        community.id,
        `Bot ${bot.client?.user?.username} added member ${member.user.username} to server ${serverId}`,
        {
          botId,
        },
      )
      this.logger.verbose(
        `${botId} ${serverId} Processed member ${created.id} ${member.user.username} (linked: ${!!member.id})`,
      )
      if (member.id) {
        linkedCount++
      }
    }
    this.logger.verbose(
      `Found ${members.length} members to process (filtered ${filtered.length}) (linked ${linkedCount})`,
    )
    return true
  }
}

function convertPermissions(permissions: Record<PermissionsString, boolean>) {
  return (Object.keys(permissions) as PermissionsString[]).filter((key) => permissions[key] === true)
}
