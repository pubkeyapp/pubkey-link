import { Field, HideField, ObjectType } from '@nestjs/graphql'
import { DiscordRole, DiscordServer } from './discord-server.entity'

@ObjectType()
export class BotRole {
  @Field()
  id!: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field({ nullable: true })
  botId!: string
  @Field({ nullable: true })
  serverRoleId!: string
  @Field(() => DiscordRole, { nullable: true })
  serverRole?: DiscordRole | null
  @Field(() => DiscordServer, { nullable: true })
  server?: DiscordServer | null
  @Field({ nullable: true })
  serverId!: string
  @HideField()
  permissions?: unknown[]
}
