import { BotServer } from '@prisma/client'
import { DiscordRoleMap, DiscordServerMember } from '../entity/discord-server.entity'

export interface ApiBotRemoveRolePayload {
  botServer: BotServer
  communityId: string
  discordMember: DiscordServerMember
  discordRoleMap: DiscordRoleMap
  roleIds: string[]
}
