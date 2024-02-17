import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { Bot, IdentityProvider, UserStatus } from '@prisma/client'
import { createDiscordRestClient, DiscordBot } from '@pubkey-link/api-bot-util'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { ChannelType, Guild, PermissionsString, User } from 'discord.js'
import { ApiBotMemberService } from './api-bot-member.service'
import { BotStatus } from './entity/bot-status.enum'
import { DiscordChannel, DiscordRole, DiscordServer } from './entity/discord-server.entity'

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

  async getBotChannels(botId: string, serverId: string): Promise<DiscordChannel[]> {
    const bot = this.getBotInstance(botId)
    if (!bot) {
      return []
    }
    const channels = await bot.getDiscordServerChannels(serverId)

    return channels
      .filter(({ type }) => [ChannelType.GuildCategory, ChannelType.GuildText].includes(type))
      .map((channel) => ({
        id: channel.id,
        name: channel.name,
        type: ChannelType[channel.type],
        parentId: channel.parentId,
      }))
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

  async leaveBotServer(botId: string, serverId: string) {
    return this.ensureBotInstance(botId).leaveServer(serverId)
  }

  async startBot(bot: Bot) {
    if (this.bots.get(bot.id)) {
      throw new Error(`Bot ${bot.name} already started`)
    }

    const instance = new DiscordBot({ botId: bot.id, token: bot.token })
    await instance.start()
    await this.setupListeners(bot, instance)
    this.bots.set(bot.id, instance)

    return true
  }

  async stopBot(bot: Bot) {
    const instance = this.bots.get(bot.id)
    if (!instance) {
      throw new Error(`Bot ${bot.name} not started`)
    }
    await instance.stop()
    this.bots.delete(bot.id)

    return true
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

  async getGuildMember(guild: Guild, memberId: string) {
    try {
      return await guild.members.fetch(memberId)
    } catch (e) {
      return undefined
    }
  }

  async syncBotServer(botId: string, serverId: string) {
    const [communityMembers, communityRoles, botMembers, botServer, botInstance] = await Promise.all([
      this.getCommunityMemberMap({ botId }),
      this.getRolePermissions({ botId, serverId }),
      this.ensureBotInstance(botId).getDiscordServerMembers(serverId),
      this.ensureBotServer({ botId, serverId }),
      this.ensureBotInstance(botId),
    ])
    const guild = await botInstance.client?.guilds.fetch(serverId)

    if (!guild) {
      throw new Error(`Server ${serverId} not found for bot ${botId}`)
    }

    const { dryRun, commandChannel } = botServer

    async function sendCommandChannel(message: string) {
      if (!commandChannel) {
        return
      }
      await botInstance.sendChannel(commandChannel, message)
    }

    const communityRoleIds = Object.values(communityRoles).flat()

    // Now that we have a member and role map, we can create an overview of the roles in the community
    const roles = await this.getBotRoles(botId, serverId).then((roles) =>
      roles.filter((role) => communityRoleIds.includes(role.id)),
    )

    const roleMap: Record<string, string> = roles
      .map((role) => ({ [role.id]: role.name }))
      .reduce((acc, role) => ({ ...acc, ...role }), {})

    const notFound: string[] = []

    for (const cm of communityMembers) {
      const discordId = cm.discordId
      if (!discordId) {
        continue
      }

      const found = botMembers.find((member) => member.memberId === discordId)
      if (!found) {
        continue
      }
      const member = await this.getGuildMember(guild, discordId)
      if (!member) {
        this.logger.warn(`syncBotServerRoles: MEMBER ${discordId} NOT FOUND IN GUID`)
        notFound.push(discordId)
        continue
      }
      const botMember = botMembers.find((member) => member.memberId === discordId)
      const botMemberRoles = botMember?.roleIds ?? []

      const communityMemberRoles = cm.roles.map((role) => communityRoles[role]).flat()

      const { toBeAdded, toBeRemoved } = getAddRemoved({ communityMemberRoles, botMemberRoles, roles })

      if (toBeAdded.length) {
        if (!dryRun) {
          await member.roles.add(toBeAdded)
        }
        const { botMessage, logMessage } = messageAdd({ dryRun, communityMember: cm, roles: toBeAdded, roleMap })
        await this.core.logVerbose(logMessage, { botId, communityId: cm.communityId, userId: cm.userId })
        await sendCommandChannel(botMessage)
      }

      if (toBeRemoved.length) {
        if (!dryRun) {
          await member.roles.remove(toBeRemoved)
        }
        const { botMessage, logMessage } = messageRemove({ dryRun, communityMember: cm, roles: toBeRemoved, roleMap })
        await this.core.logVerbose(logMessage, { botId, communityId: cm.communityId, userId: cm.userId })
        await sendCommandChannel(botMessage)
      }
    }
    if (notFound.length) {
      this.logger.warn(`Accounts not in Discord server: ${notFound.length}`)
    }

    this.logger.verbose(`Synced ${communityMembers.length} members in ${serverId} for bot ${botId}`)

    return true
  }

  async testBotServerConfig(botId: string, serverId: string) {
    const bot = await this.core.data.bot.findUnique({ where: { id: botId }, include: { community: true } })
    if (!bot) {
      throw new Error(`Bot ${botId} not found`)
    }

    const discordBot = this.getBotInstance(botId)
    if (!discordBot) {
      throw new Error(`Bot ${botId} not started`)
    }

    const discordServer = await discordBot.client?.guilds.fetch(serverId)
    if (!discordServer) {
      throw new Error(`Server ${serverId} not found`)
    }

    const botServer = await this.core.data.botServer.findUnique({ where: { botId_serverId: { botId, serverId } } })
    if (!botServer) {
      throw new Error(`Bot server ${serverId} not found`)
    }
    if (!botServer.commandChannel) {
      throw new Error(`This bot does not have a command channel set`)
    }

    const summary = await this.getCommunityRoleSummary(bot.communityId)

    await discordBot.sendChannel(botServer.commandChannel, {
      embeds: [
        {
          title: `Configuration for ${discordBot.client?.user?.username} in ${bot.community.name} (${bot.community.cluster})`,
          fields: [
            { name: `Admin Role`, value: botServer.adminRole ? `<@&${botServer.adminRole}>` : 'Not set' },
            { name: `Command Channel`, value: `<#${botServer.commandChannel}>` },
            { name: `Dry Run`, value: botServer.dryRun ? 'Enabled' : 'Disabled' },
            { name: `Enable Sync`, value: botServer.enableSync ? 'Enabled' : 'Disabled' },
            { name: 'Roles:', value: `There are ${summary.length} roles in this community` },
            ...summary.map((role) => ({
              name: `${role.name}`,
              value: `Conditions (**${role.conditions.length}**):
               ${role.conditions.map(
                 (condition) =>
                   ` - ${condition.amount} [${condition.token?.symbol}](https://solana.fm/address/${condition.token?.account}) ${condition.token?.name} (${condition.type})\n`,
               )}Permissions (**${role.permissions.length}**):
                ${role.permissions.map(
                  (permission) => ` - <@&${permission.botRole?.serverRoleId}>\n`,
                )}Members with this role: **${role.members.length}**.
            `,
            })),
          ],
          url: `${this.core.config.webUrl}/c/${bot.communityId}/discord/servers/${serverId}`,
        },
      ],
    })

    return botServer
  }
  @Cron(CronExpression.EVERY_MINUTE)
  private async syncAllBotServers() {
    if (!this.core.config.syncBotServers) {
      this.logger.verbose(`Bot server sync is disabled`)
      return
    }
    const bots = await this.core.data.bot.findMany({ where: { status: BotStatus.Active } })

    for (const bot of bots) {
      const servers = await this.getBotServers(bot.id)
      for (const server of servers.filter((e) => e)) {
        const botServer = await this.ensureBotServer({ botId: bot.id, serverId: server.id })
        if (botServer.enableSync) {
          await this.syncBotServer(bot.id, server.id)
        } else {
          this.logger.debug(`[${bot.name}] Sync is disabled for server ${server.name}`)
        }
      }
    }
    return bots
  }

  // Get the role permissions for a bot in a server
  private async getRolePermissions({ botId, serverId }: { botId: string; serverId: string }) {
    return this.core.data.rolePermission
      .findMany({
        where: {
          role: { community: { bot: { id: botId } } },
        },
        select: {
          roleId: true,
          botRole: {
            where: { serverId },
            select: { serverRoleId: true },
          },
        },
      })
      .then((permissions) => {
        return permissions.reduce((acc, permission) => {
          if (!permission.botRole?.serverRoleId) {
            return acc
          }
          if (!acc[permission.roleId]) {
            acc[permission.roleId] = []
          }
          acc[permission.roleId].push(permission.botRole.serverRoleId)
          return acc
        }, {} as Record<string, string[]>)
      })
  }

  private async getCommunityMemberMap({ botId }: { botId: string }) {
    return this.core.data.communityMember
      .findMany({
        where: {
          community: { bot: { id: botId } },
          user: {
            status: UserStatus.Active,
            identities: { some: { provider: IdentityProvider.Discord } },
          },
        },
        select: {
          communityId: true,
          user: {
            select: {
              // Basic user info
              id: true,
              username: true,
              identities: {
                // Discord identity
                where: { provider: IdentityProvider.Discord },
                select: { provider: true, providerId: true },
              },
              communities: {
                where: {
                  // The community related to this bot
                  community: { bot: { id: botId } },
                },
                include: {
                  // Get the roles for this member in the community
                  roles: { select: { roleId: true } },
                },
              },
            },
          },
        },
      })
      .then((members) =>
        members
          .filter((member) => member.user.communities.length)
          .map(({ user }) => {
            const community = user.communities[0]
            const discord = user.identities.find((i) => i.provider === IdentityProvider.Discord)
            const roles = community.roles.map((role) => role.roleId)

            return {
              userId: user.id,
              username: user.username,
              discordId: discord?.providerId,
              communityId: community.communityId,
              roles,
            }
          }),
      )
  }

  async ensureBotServer({ botId, serverId }: { botId: string; serverId: string }) {
    const found = await this.core.data.botServer.findUnique({
      where: { botId_serverId: { botId, serverId } },
      include: { bot: true },
    })
    if (!found) {
      // Make sure this bot is connected to the server
      const found = await this.ensureBotInstance(botId).client?.guilds.fetch(serverId)
      if (!found) {
        throw new Error(`Server ${serverId} not found for bot ${botId}`)
      }
      this.logger.verbose(`Creating bot server ${serverId}`)
      const created = await this.core.data.botServer.create({
        data: { bot: { connect: { id: botId } }, serverId },
        include: { bot: true },
      })
      await this.syncBotServer(botId, serverId)
      return created
    }
    return found
  }

  private getCommunityRoleSummary(communityId: string) {
    return this.core.data.role.findMany({
      where: { communityId },
      include: {
        conditions: { include: { token: true } },
        permissions: { include: { botRole: true } },
        members: true,
      },
    })
  }

  private async setupListeners(bot: Bot, instance: DiscordBot) {
    if (!instance.client?.user) {
      this.logger.warn(`Bot client on instance not found.`)
      return
    }
    this.logger.verbose(`Setting up listeners for bot ${bot.name}`)
    instance.client.on('guildMemberAdd', (member) =>
      this.logger.verbose(
        'guildMemberAdd:' +
          JSON.stringify({
            botId: bot.id,
            communityId: bot.communityId,
            serverId: member.guild.id,
            userId: member.id,
            roleIds: member.roles.cache.map((role) => role.id),
          }),
      ),
    )
    instance.client.on('guildMemberRemove', (member) =>
      this.logger.verbose(
        'guildMemberRemove' +
          JSON.stringify({
            botId: bot.id,
            communityId: bot.communityId,
            serverId: member.guild.id,
            userId: member.id,
          }),
      ),
    )
  }

  isStarted(botId: string) {
    return !!this.bots.get(botId)
  }

  developersUrl(botId: string) {
    return `https://discord.com/developers/applications/${botId}`
  }

  inviteUrl(botId: string) {
    const url = new URL('https://discord.com/api/oauth2/authorize')
    url.searchParams.append('client_id', botId)
    url.searchParams.append('permissions', '2415935488')
    // url.searchParams.append('permissions', '268437504')
    url.searchParams.append('scope', ' bot role_connections.write')
    url.searchParams.append('redirect_uri', this.redirectUrl(botId))
    url.searchParams.append('response_type', 'code')

    return url.toString()
  }

  redirectUrl(botId: string) {
    return this.core.config.authDiscordStrategyOptions.callbackURL
    // return `${this.core.config.apiUrl}/bot/${botId}/callback`
  }

  verificationUrl(botId: string) {
    return `${this.core.config.webUrl}/bot/${botId}/verification`
  }
}

function convertPermissions(permissions: Record<PermissionsString, boolean>) {
  return (Object.keys(permissions) as PermissionsString[]).filter((key) => permissions[key] === true)
}

function messageRemove({
  communityMember: { discordId, username },
  dryRun,
  roles,
  roleMap,
}: {
  communityMember: { username: string; discordId?: string }
  dryRun: boolean
  roles: string[]
  roleMap: Record<string, string>
}) {
  const prefix = roles.length > 1 ? '😭 Removed roles from' : '😭 Removed role from'
  return {
    botMessage: `${dryRunBot(dryRun)} ${prefix} <@${discordId}>: ${roles.map((r) => `<@&${r}>`).join(', ')}`,
    logMessage: `${dryRunLog(dryRun)} ${prefix} ${username}: ${roles.map((r) => roleMap[r]).join(', ')}`,
  }
}

function messageAdd({
  communityMember: { username, discordId },
  dryRun,
  roles,
  roleMap,
}: {
  communityMember: { username: string; discordId?: string }
  dryRun: boolean
  roles: string[]
  roleMap: Record<string, string>
}) {
  const prefix = roles.length > 1 ? '🥳 Added roles to' : '🥳 Added role to'
  return {
    botMessage: `${dryRunBot(dryRun)} ${prefix} <@${discordId}>: ${roles.map((r) => `<@&${r}>`).join(', ')}`,
    logMessage: `${dryRunLog(dryRun)} ${prefix} ${username}: ${roles.map((r) => roleMap[r]).join(', ')}`,
  }
}

function dryRunBot(dryRun: boolean) {
  return dryRun ? `**${dryRunLog(dryRun)}**` : ''
}
function dryRunLog(dryRun: boolean) {
  return dryRun ? '[DRY RUN]' : ''
}

function getAddRemoved({
  communityMemberRoles,
  botMemberRoles,
  roles,
}: {
  communityMemberRoles: string[]
  botMemberRoles: string[]
  roles: DiscordRole[]
}) {
  const toBeAdded = communityMemberRoles.filter((role) => {
    return !botMemberRoles.includes(role) && roles.find((r) => r.id === role)
  })
  const toBeRemoved = botMemberRoles.filter((role) => {
    return !communityMemberRoles.includes(role) && roles.find((r) => r.id === role)
  })

  return { toBeAdded, toBeRemoved }
}
