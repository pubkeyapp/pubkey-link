import { Injectable, Logger, OnModuleInit } from '@nestjs/common'

import { createDiscordRestClient, DiscordBot } from '@pubkey-link/api-bot-util'

import { PermissionsString, User } from 'discord.js'
import { BotStatus } from './entity/bot-status.enum'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { DiscordServer, DiscordServerRole } from './entity/discord-server.entity'

@Injectable()
export class ApiBotManagerService implements OnModuleInit {
  private readonly logger = new Logger(ApiBotManagerService.name)
  private readonly bots = new Map<string, DiscordBot>()
  constructor(private readonly core: ApiCoreService) {}

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

  async getBotRoles(botId: string, serverId: string): Promise<DiscordServerRole[]> {
    return this.ensureBotInstance(botId).getRoles(serverId)
  }

  async getBotServers(botId: string): Promise<DiscordServer[]> {
    const instance = this.ensureBotInstance(botId)
    const servers = await instance.client?.guilds.fetch()

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

  async getBotServer(botId: string, serverId: string): Promise<DiscordServer> {
    const instance = this.ensureBotInstance(botId)
    const server = await instance.client?.guilds.fetch({ guild: serverId })

    if (!server) {
      throw new Error(`Server ${serverId} not found`)
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
    url.searchParams.append('permissions', '268437504')
    url.searchParams.append('scope', ' bot role_connections.write')
    url.searchParams.append('redirect_uri', this.redirectUrl(botId))
    url.searchParams.append('response_type', 'code')

    return url.toString()
  }

  async leaveBotServer(botId: string, serverId: string) {
    return this.ensureBotInstance(botId).leaveServer(serverId)
  }

  redirectUrl(botId: string) {
    return `${this.core.config.apiUrl}/bot/${botId}/callback`
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

  getBotInstance(botId: string, { throwIfNotStarted = true } = {}) {
    const instance = this.bots.get(botId)
    if (!instance && throwIfNotStarted) {
      throw new Error(`Bot ${botId} not started`)
    }
    return instance
  }

  ensureBotInstance(botId: string) {
    const instance = this.bots.get(botId)
    if (!instance) {
      throw new Error(`Bot ${botId} not started`)
    }
    return instance
  }
}

function convertPermissions(permissions: Record<PermissionsString, boolean>) {
  return (Object.keys(permissions) as PermissionsString[]).filter((key) => permissions[key] === true)
}
