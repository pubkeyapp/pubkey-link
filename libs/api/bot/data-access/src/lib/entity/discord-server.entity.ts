import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class DiscordServer {
  @Field()
  id!: string
  @Field()
  name!: string
  @Field({ nullable: true })
  icon?: string | null
  @Field(() => [String], { nullable: true })
  permissions?: string[] | null
}
@ObjectType()
export class DiscordRole {
  @Field()
  id!: string
  @Field()
  name!: string
  @Field()
  managed!: boolean
  @Field(() => Int)
  color!: number
  @Field(() => Int)
  position!: number
}

export type DiscordRoleMap = Record<string, string>
export type DiscordServerMember = { discordId: string; username: string; roleIds: string[] }

// Maps the roles in the community with an internal id to an array of discord role ids
export type CommunityRoleMap = Record<string, string[]>

@ObjectType()
export class DiscordChannel {
  @Field()
  id!: string
  @Field()
  name!: string
  @Field()
  type!: string
  @Field({ nullable: true })
  parentId!: string | null
}
