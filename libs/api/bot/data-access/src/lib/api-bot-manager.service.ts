import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { Bot, IdentityProvider, UserStatus } from '@prisma/client'
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

  isStarted(botId: string) {
    return !!this.bots.get(botId)
  }

  developersUrl(botId: string) {
    return `https://discord.com/developers/applications/${botId}`
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

  async startBot(bot: Bot) {
    if (this.bots.get(bot.id)) {
      throw new Error(`Bot ${bot.name} already started`)
    }

    const instance = new DiscordBot({ botId: bot.id, token: bot.token })
    await instance.start()
    await this.botMember.setupListeners(bot, instance)
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
    const community = await this.core.data.community.findFirst({
      where: { bot: { id: botId } },
      include: { bot: true },
    })
    if (!community?.bot) {
      console.log(`Can't find community.`, botId, serverId)
      return false
    }

    await this.syncBotServerMembers({
      communityId: community.id,
      botId,
      serverId,
    })
    return true
  }

  async syncBotServerRoles(botId: string, serverId: string) {
    //

    const [communityMembers, communityRoles, botMembers, botServer] = await Promise.all([
      this.getCommunityMemberMap({ botId, serverId }),
      this.getRolePermissions({ botId, serverId }),
      this.getBotMembers({ botId, serverId }),
      this.ensureBotServer({ botId, serverId }),
    ])

    const { dryRun, commandChannel } = botServer

    // Now that we have a member and role map, we can create an overview of the roles in the community
    const roles = await this.getBotRoles(botId, serverId)

    for (const communityMember of communityMembers) {
      if (!communityMember.discordId) {
        continue
      }
      const botMember = botMembers.find((member) => member.userId === communityMember.discordId)
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

    await this.syncBotServer(botId, serverId)
    return true
  }
  private async getBotMembers({ botId, serverId }: { botId: string; serverId: string }) {
    return this.core.data.botMember.findMany({
      where: {
        botId,
        serverId,
      },
    })
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

  private async getCommunityMemberMap({ botId, serverId }: { botId: string; serverId: string }) {
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
              id: user.id,
              username: user.username,
              discordId: discord?.providerId,
              communityId: community.communityId,
              roles,
            }
          })

        return result
      })
  }

  @Cron(CronExpression.EVERY_MINUTE)
  private async syncBotServers() {
    const bots = await this.core.data.bot.findMany({ where: { status: BotStatus.Active } })

    for (const bot of bots) {
      const servers = await this.getBotServers(bot.id)
      for (const server of servers) {
        await this.ensureBotServer({ botId: bot.id, serverId: server.id })
        await this.syncBotServerMembers({ botId: bot.id, communityId: bot.communityId, serverId: server.id })
        await this.syncBotServerRoles(bot.id, server.id)
      }
    }
    return bots
  }

  private async ensureBotServer({ botId, serverId }: { botId: string; serverId: string }) {
    const found = await this.core.data.botServer.findUnique({
      where: { botId_serverId: { botId, serverId } },
    })
    if (!found) {
      this.logger.verbose(`Creating bot server ${serverId}`)
      return this.core.data.botServer.create({ data: { bot: { connect: { id: botId } }, serverId } })
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

    const [discordIdentityIds, botMemberRoleIds, rolePermissions] = await Promise.all([
      this.botMember.getDiscordIdentityIds(),
      this.botMember.getBotMemberRoleIds(botId, serverId),
      this.getRolePermissions({ botId, serverId }),
    ])
    const members = await discordBot.getDiscordServerMembers(serverId)

    const communityRoleIds = Object.values(rolePermissions).flat()

    const filtered = members
      // We only want to process members that have a discord identity we know about
      .filter(({ id: discordMemberId }) => discordIdentityIds.includes(discordMemberId))
      // We don't want to process members that are already in the database (same memberId and roleIds)
      .filter(({ id: discordMemberId, roleIds: discordRoleIds }) => {
        const botMember = botMemberRoleIds.find(({ memberId: botMemberId }) => {
          return botMemberId === discordMemberId
        })
        if (!botMember) {
          return true
        }
        const ids = discordRoleIds.filter((roleId) => communityRoleIds.includes(roleId))
        if (botMember.roleIds.length !== ids.length) {
          return true
        }
        return botMember.roleIds.some((roleId) => !ids.includes(roleId))
      })

    if (!filtered.length) {
      this.logger.verbose(`${tag}: No members to process (filtered ${members.length} members)`)
      return true
    }

    const toBeDeleted = botMemberRoleIds.filter(({ memberId }) => {
      return !members.find((member) => member.id === memberId)
    })

    if (toBeDeleted.length) {
      this.logger.warn(`${tag}: Found ${toBeDeleted.length} members to delete`)
      for (const { memberId } of toBeDeleted) {
        this.logger.verbose(`${tag}: Removing member ${memberId} from bot ${botId} server ${serverId}...`)
        await this.botMember.scheduleRemoveMember({ communityId, botId, serverId, userId: memberId })
      }
    }

    let linkedCount = 0
    if (filtered.length) {
      this.logger.verbose(`${tag}: Found ${filtered.length} members to process`)
      for (const member of filtered) {
        const roleIds = (member.roleIds.filter((roleId) => communityRoleIds.includes(roleId)) ?? []).sort()
        await this.botMember.scheduleUpsertMember({
          communityId,
          botId: botId,
          serverId,
          userId: member.id,
          roleIds,
        })
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
}

function convertPermissions(permissions: Record<PermissionsString, boolean>) {
  return (Object.keys(permissions) as PermissionsString[]).filter((key) => permissions[key] === true)
}

function rolesMessage(discordId: string, roleIds: string[]) {
  return `roles to <@${discordId}>: ${roleIds.map((r) => `<@&${r}>`).join(', ')}`
}
