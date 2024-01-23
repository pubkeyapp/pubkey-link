import { REST } from '@discordjs/rest'
import { Logger } from '@nestjs/common'
import { Client } from 'discord.js'
import { createDiscordClient } from './discord/client'

export interface RESTDiscordRoleConnection {
  type: number
  name: string
  description: string
  key: string
}

export interface RESTDiscordRole {
  id: string
  name: string
  color: number
  managed: boolean
  position: number
}

export class DiscordBot {
  private readonly logger = new Logger(DiscordBot.name)
  client?: Client
  rest?: REST
  constructor(private readonly config: { botId: string; token: string }) {}

  async start() {
    this.logger.verbose(`Starting bot...`)
    this.client = await createDiscordClient(this.config.token)
    this.rest = new REST({ version: '10' }).setToken(this.config.token)
    this.logger.verbose(`Bot started`)
  }

  async stop() {
    this.logger.verbose(`Stopping bot...`)
    await this.client?.destroy()
    this.logger.verbose(`Bot stopped`)
  }

  async addRoleConnection(input: RESTDiscordRoleConnection): Promise<RESTDiscordRoleConnection[]> {
    const existing = await this.getRoleConnections()

    const found = existing.find((item) => item.key === input.key)
    if (found) {
      throw new Error(`Role ${input.key} already exists`)
    }

    const roles = await this.rest
      ?.put(`/applications/${this.config.botId}/role-connections/metadata`, { body: [...existing, input] })
      .catch(() => {
        throw new Error(`Error adding role ${input.key}`)
      })
    return (roles ?? []) as RESTDiscordRoleConnection[]
  }

  async getApplication() {
    return (await this.rest?.get(`/applications/${this.config.botId}`)) as BotApplication
  }

  async getRoleConnections(): Promise<RESTDiscordRoleConnection[]> {
    const roles = await this.rest?.get(`/applications/${this.config.botId}/role-connections/metadata`)

    return (roles ?? []) as RESTDiscordRoleConnection[]
  }

  async getRoles(serverId: string): Promise<RESTDiscordRole[]> {
    const server = await this.getServer(serverId)
    const roles = await server?.roles.fetch()
    const summary =
      roles?.map((role) => ({
        id: role.id,
        name: role.name,
        color: role.color,
        managed: role.managed,
        position: role.position,
      })) ?? []

    return summary.sort((a, b) => b.position - a.position)
  }

  async getServer(serverId: string) {
    return await this.client?.guilds.fetch({ guild: serverId })
  }

  async leaveServer(serverId: string) {
    const server = await this.client?.guilds.fetch({ guild: serverId })
    if (!server) {
      throw new Error(`Server ${serverId} not found`)
    }

    const result = await server.leave()
    this.logger.verbose(`Bot ${this.client?.user?.username} left server ${result.name}`)
    return true
  }

  async removeRoleConnection(key: string): Promise<RESTDiscordRoleConnection[]> {
    const existing = await this.getRoleConnections()

    const found = existing.find((item) => item.key === key)
    if (!found) {
      throw new Error(`Role ${key} not found`)
    }

    const roles = await this.rest
      ?.put(`/applications/${this.config.botId}/role-connections/metadata`, {
        body: existing.filter((item) => item.key !== key),
      })
      .catch(() => {
        throw new Error(`Error removing role ${key}`)
      })

    return (roles ?? []) as RESTDiscordRoleConnection[]
  }
}

export interface BotApplication {
  redirect_uris: string[]
  role_connections_verification_url: string
}
