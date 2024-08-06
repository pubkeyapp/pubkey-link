import { Injectable, Logger } from '@nestjs/common'
import { IdentityProvider, User } from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import {
  ButtonStyle,
  CommandInteraction,
  ComponentType,
  InteractionReplyOptions,
  SlashCommandBuilder,
} from 'discord.js'

export interface ApiBotCommand {
  data: SlashCommandBuilder
  execute: (interaction: CommandInteraction) => Promise<string | InteractionReplyOptions | undefined | void>
}

@Injectable()
export class ApiBotCommandsService {
  private readonly logger = new Logger(ApiBotCommandsService.name)
  readonly commands: Map<string, ApiBotCommand> = new Map()
    .set('help', {
      data: new SlashCommandBuilder().setName('help').setDescription('Get help with the bot'),
      execute: async (interaction: CommandInteraction) => {
        await interaction.reply({
          embeds: [
            {
              fields: [
                { name: '/help', value: 'Get help with the bot' },
                { name: '/whoami', value: 'Get your PubKey profile' },
                { name: '/verify', value: 'Verify your Discord account and Solana wallets' },
              ],
            },
          ],
        })
      },
    })
    .set('verify', {
      data: new SlashCommandBuilder()
        .setName('verify')
        // Allow mentioning another user
        .addUserOption((option) => option.setName('user').setRequired(false).setDescription('Mention another user'))
        .setDescription('Verify your Discord account and Solana wallets'),
      execute: async (interaction: CommandInteraction) => {
        const mentionsOtherUser = interaction.options.get('user')?.value
        const targetUserId = (mentionsOtherUser ?? interaction.user.id).toString()
        const isYou = targetUserId === interaction.user.id
        const found = await this.getUserByDiscordId(targetUserId)

        const link = this.core.config.webUrl
        const isFound = found?.owner

        const message = isFound
          ? `is linked to a PubKey account.`
          : `is not linked to a PubKey account. Please link it at ${link}`

        return {
          ephemeral: isYou,
          content: !isYou ? `<@${targetUserId}>` : undefined,
          embeds: [
            {
              author: {
                name: found?.owner?.username,
                iconURL: found?.owner?.avatarUrl,
              },
              description: `<@${targetUserId}> ${message}`,
              thumbnail: { url: found?.owner?.avatarUrl },
            },
          ],
          components: [
            {
              type: ComponentType.ActionRow,
              components: [
                isFound
                  ? isYou
                    ? {
                        type: ComponentType.Button,
                        style: ButtonStyle.Link,
                        label: 'Sign in with Discord to manage your profile',
                        url: `${link}/api/auth/discord`,
                        disabled: false,
                      }
                    : {
                        type: ComponentType.Button,
                        style: ButtonStyle.Link,
                        label: 'View this profile',
                        url: `${link}/u/${found.owner.username}`,
                        disabled: false,
                      }
                  : {
                      type: ComponentType.Button,
                      style: ButtonStyle.Link,
                      label: 'Sign in with Discord to create a profile',
                      url: `${link}/api/auth/discord`,
                      disabled: false,
                    },
              ],
            },
          ],
        }
      },
    })
    .set('whoami', {
      data: new SlashCommandBuilder().setName('whoami').setDescription('Get your PubKey profile'),
      execute: async (interaction: CommandInteraction) => {
        const found = await this.getUserByDiscordId(interaction.user.id)
        const roleIds = getRolesFromInteraction(interaction)
        const { fields, author, profileUrl } = defaultOwnerFields({
          owner: found?.owner,
          roleIds,
          webUrl: this.core.config.webUrl,
        })

        return {
          ephemeral: true,
          embeds: [
            found?.owner
              ? {
                  author,
                  thumbnail: { url: author.iconURL },
                  color: 2326507,
                  fields: [...fields],
                  title: `Your PubKey Profile`,
                  description: `This is your PubKey profile. It links your Discord account to your Solana wallets.\n
              Based on the assets you have linked to your Solana wallets, you can earn rewards and get access to features.`,
                }
              : {
                  color: 2326507,
                  description: `Your Discord account is not linked to a PubKey account. Please link your account at ${this.core.config.webUrl}`,
                },
          ],
          components: [
            {
              type: ComponentType.ActionRow,
              components: [
                found?.owner
                  ? {
                      type: ComponentType.Button,
                      style: ButtonStyle.Link,
                      label: 'View your profile',
                      url: profileUrl,
                      disabled: false,
                    }
                  : {
                      type: ComponentType.Button,
                      style: ButtonStyle.Link,
                      label: 'Sign in with Discord to create a profile',
                      url: `${this.core.config.webUrl}/api/auth/discord`,
                      disabled: false,
                    },
              ],
            },
          ],
        }
      },
    })
  constructor(private readonly core: ApiCoreService) {}

  private async getUserByDiscordId(discordId: string) {
    return this.core.data.identity.findUnique({
      where: {
        provider_providerId: {
          provider: IdentityProvider.Discord,
          providerId: discordId.toString(),
        },
      },
      include: {
        owner: {
          include: {
            identities: true,
          },
        },
      },
    })
  }
}

function getRolesFromInteraction(interaction: CommandInteraction) {
  return interaction.guild?.members.cache.get(interaction.user.id)?.roles.cache.map((role) => role.id) ?? []
}

function defaultOwnerFields({ owner, roleIds, webUrl }: { owner?: User; roleIds: string[]; webUrl: string }) {
  const profileUrl = `${webUrl}/u/${owner?.username}`
  return {
    author: {
      name: owner?.username,
      iconURL: owner?.avatarUrl,
      url: profileUrl,
    },
    fields: owner
      ? [createdAtField(new Date(owner.createdAt)), updatedAtField(new Date(owner.updatedAt)), rolesField(roleIds)]
      : [],
    profileUrl,
  }
}

function rolesField(roleIds: string[]) {
  return {
    name: `ROLES (${roleIds.length})`,
    value: roleIds.map((id) => `<@&${id}>`).join(', '),
  }
}

function createdAtField(createdAt: Date) {
  return {
    name: 'Registered',
    value: `<t:${Math.floor(createdAt.getTime() / 1000)}>`,
    inline: true,
  }
}

function updatedAtField(updatedAt: Date) {
  return {
    name: 'Updated',
    value: `<t:${Math.floor(updatedAt.getTime() / 1000)}>`,
    inline: true,
  }
}
