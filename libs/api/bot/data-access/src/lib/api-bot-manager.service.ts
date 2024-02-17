import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { Bot, CommunityRole, IdentityProvider, UserStatus } from '@prisma/client'
import { createDiscordRestClient, DiscordBot } from '@pubkey-link/api-bot-util'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { ChannelType, PermissionsString, User } from 'discord.js'
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

  async getBotMembers(botId: string, serverId: string) {
    const [botMembers, botRoleIds, discordIds] = await Promise.all([
      this.ensureBotInstance(botId).getDiscordServerMembers(serverId),
      this.getBotRoleIds(botId),
      this.getDiscordIdentityIds(),
    ])
    return botMembers
      .filter((member) => discordIds.includes(member.memberId))
      .map((member) => {
        return {
          memberId: member.memberId,
          roleIds: member.roleIds.filter((role) => botRoleIds.includes(role)),
        }
      })
  }

  private async getDiscordIdentityIds() {
    return this.core.data.identity
      .findMany({ where: { provider: IdentityProvider.Discord }, select: { providerId: true } })
      .then((items) => items.map((item) => item.providerId))
  }

  private async getDiscordIdentities() {
    return this.core.data.identity.findMany({
      where: { provider: IdentityProvider.Discord },
      select: { providerId: true, ownerId: true },
    })
  }

  private async getBotRoleIds(botId: string) {
    return this.core.data.botPermission
      .findMany({ where: { botId } })
      .then((items) => items.map((item) => item.serverRoleId))
  }

  private async linkBotMemberIdentities({
    communityId,
    botMembers,
    communityMembers,
  }: {
    communityId: string
    botMembers: { memberId: string; roleIds: string[] }[]
    communityMembers: { userId: string; username: string; discordId?: string }[]
  }) {
    const discordIdentities = await this.getDiscordIdentities()
    const discordIds = discordIdentities.map((identity) => identity.providerId)

    // Get all the bot members
    const botMemberIdentities = botMembers.map((member) => member.memberId).filter((id) => discordIds.includes(id))
    const communityMemberIdentities = communityMembers.map((member) => member.discordId)

    // Get all the bot members that are not in the community
    const toBeAdded = botMembers
      .filter(({ memberId }) => discordIds.includes(memberId))
      .filter((member) => !communityMemberIdentities.includes(member.memberId))

    // Get all the community members that are not in the bot
    const toBeRemoved = communityMembers.filter((member) =>
      member.discordId ? !botMemberIdentities.includes(member.discordId) : false,
    )
    this.logger.verbose(`linkBotMemberIdentities: ${toBeAdded.length} to be added, ${toBeRemoved.length} to be removed`)

    // Add the missing members to the community
    await this.addMembersToCommunity({ botMembers: toBeAdded, communityId, discordIdentities })

    // Remove the members that are not in the bot
    await this.removeMembersFromCommunity({
      botMembers: toBeRemoved,
      discordIdentities,
      communityId,
    })
  }

  private async addMembersToCommunity({
    botMembers,
    communityId,
    discordIdentities,
  }: {
    botMembers: { memberId: string; roleIds: string[] }[]
    communityId: string
    discordIdentities: { ownerId: string; providerId: string }[]
  }) {
    for (const member of botMembers) {
      const identity = discordIdentities.find((m) => m.providerId === member.memberId)
      if (!identity) {
        console.log('No community member found for', member.memberId)
        continue
      }

      await this.core.data.communityMember.create({
        data: { userId: identity.ownerId, communityId, role: CommunityRole.Member },
      })
      await this.core.logInfo(`Added member ${identity.ownerId} to community ${communityId}`, {
        communityId,
        userId: identity.ownerId,
      })
    }
  }

  private async removeMembersFromCommunity({
    botMembers,
    discordIdentities,
    communityId,
  }: {
    botMembers: { userId: string; discordId?: string | null }[]
    discordIdentities: { ownerId: string; providerId: string }[]
    communityId: string
  }) {
    for (const member of botMembers) {
      const communityMember = discordIdentities.find((m) => m.providerId === member.discordId)
      if (!communityMember) {
        continue
      }
      await this.core.data.communityMember.delete({
        where: { communityId_userId: { userId: communityMember.ownerId, communityId } },
      })
      await this.core.logInfo(`Removed member ${communityMember.ownerId} from community ${communityId}`, {
        communityId,
        userId: communityMember.ownerId,
      })
    }
  }

  async syncBotServer(botId: string, serverId: string) {
    const [communityMembers, communityRoles, botMembers, botServer] = await Promise.all([
      this.getCommunityMemberMap({ botId }),
      this.getRolePermissions({ botId, serverId }),
      this.ensureBotInstance(botId).getDiscordServerMembers(serverId),
      this.ensureBotServer({ botId, serverId }),
    ])

    await this.linkBotMemberIdentities({ botMembers, communityMembers, communityId: botServer.bot.communityId })

    const { dryRun, commandChannel } = botServer

    // Now that we have a member and role map, we can create an overview of the roles in the community
    const roles = await this.getBotRoles(botId, serverId)

    for (const communityMember of communityMembers) {
      if (!communityMember.discordId) {
        continue
      }
      const botMember = botMembers.find((member) => member.memberId === communityMember.discordId)
      const botMemberRoles = botMember?.roleIds ?? []

      const communityMemberRoles = communityMember.roles
        .map((role) => {
          return communityRoles[role]
        })
        .flat()

      // find the difference between the botMemberRoles and the communityMemberRoles
      const toBeAdded = communityMemberRoles.filter((role) => {
        return !botMemberRoles.includes(role) && roles.find((r) => r.id === role)
      })
      const toBeRemoved = botMemberRoles.filter((role) => {
        return !communityMemberRoles.includes(role) && roles.find((r) => r.id === role)
      })

      await this.ensureBotInstance(botId)
        .client?.guilds.fetch(serverId)
        .then(async (server) => {
          const member = await server.members.fetch(communityMember.discordId!)
          if (!member) {
            this.logger.verbose(`syncBotServerRoles: MEMBER NOT FOUND ${communityMember.discordId}`)
            return
          }

          if (toBeAdded.length) {
            const message = `🥳 Added roles to <@${communityMember.discordId}>: ${toBeAdded
              .map((r) => `<@&${r}>`)
              .join(', ')}`
            if (dryRun) {
              await this.core.logVerbose(`${message} [DRY RUN] `, { communityId: communityMember.communityId })
              if (commandChannel) {
                await this.ensureBotInstance(botId).sendChannel(commandChannel, `${message} **[DRY RUN]**`)
              }
            } else {
              await member.roles.add(toBeAdded)
              await this.core.logVerbose(message, { communityId: communityMember.communityId })
              if (commandChannel) {
                await this.ensureBotInstance(botId).sendChannel(commandChannel, message)
              }
            }
          }

          if (toBeRemoved.length) {
            const message = `😭 Removed roles from <@${communityMember.discordId}>: ${toBeRemoved
              .map((r) => `<@&${r}>`)
              .join(', ')}`
            if (dryRun) {
              await this.core.logVerbose(`${message} [DRY RUN] `, { communityId: communityMember.communityId })
              if (commandChannel) {
                await this.ensureBotInstance(botId).sendChannel(commandChannel, `${message} **[DRY RUN]**`)
              }
            } else {
              await member.roles.remove(toBeRemoved)
              await this.core.logVerbose(message, { communityId: communityMember.communityId })
              if (commandChannel) {
                await this.ensureBotInstance(botId).sendChannel(commandChannel, message)
              }
            }
          }
        })
    }

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
            { name: 'Roles:', value: `There are ${summary.length} roles in this community` },
            ...summary.map((role) => ({
              name: `${role.name}`,
              value: `Conditions (**${role.conditions.length}**):
               ${role.conditions.map(
                 (condition) =>
                   ` - ${condition.amount} [${condition.token?.symbol}](https://solana.fm/address/${condition.token?.account}) ${condition.token?.name} (${condition.type})\n`,
               )}Permissions (**${role.permissions.length}**):
                ${role.permissions.map(
                  (permission) => ` - <@&${permission.bot?.serverRoleId}>\n`,
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
  private async syncBotServers() {
    if (!this.core.config.syncBotServers) {
      this.logger.verbose(`Bot server sync is disabled`)
      return
    }
    const bots = await this.core.data.bot.findMany({ where: { status: BotStatus.Active } })

    for (const bot of bots) {
      const servers = await this.getBotServers(bot.id)
      for (const server of servers) {
        await this.ensureBotServer({ botId: bot.id, serverId: server.id })

        await this.syncBotServer(bot.id, server.id)
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
          bot: {
            where: { serverId },
            select: { serverRoleId: true },
          },
        },
      })
      .then((permissions) => {
        return permissions.reduce((acc, permission) => {
          if (!permission.bot?.serverRoleId) {
            return acc
          }
          if (!acc[permission.roleId]) {
            acc[permission.roleId] = []
          }
          acc[permission.roleId].push(permission.bot.serverRoleId)
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
      .then((members) => {
        const result = members
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
          })

        return result
      })
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
        permissions: { include: { bot: true } },
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
    url.searchParams.append('permissions', '268435456')
    // url.searchParams.append('permissions', '268437504')
    url.searchParams.append('scope', ' bot role_connections.write')
    url.searchParams.append('redirect_uri', this.redirectUrl(botId))
    url.searchParams.append('response_type', 'code')

    return url.toString()
  }

  redirectUrl(botId: string) {
    return this.core.config.authDiscordStrategyOptions.callbackURL + `?botId=${botId}`
    // return `${this.core.config.apiUrl}/bot/${botId}/callback`
  }

  verificationUrl(botId: string) {
    return `${this.core.config.webUrl}/bot/${botId}/verification`
  }
}

function convertPermissions(permissions: Record<PermissionsString, boolean>) {
  return (Object.keys(permissions) as PermissionsString[]).filter((key) => permissions[key] === true)
}
