import { Field, HideField, ObjectType } from '@nestjs/graphql'
import { BotStatus } from './bot-status.enum'
import { GraphQLJSON } from 'graphql-scalars'
import { BotApplication } from '@pubkey-link/api-bot-util'

@ObjectType()
export class Bot {
  @Field()
  id!: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field()
  name!: string
  @Field({ nullable: true })
  avatarUrl?: string | null
  @Field(() => BotStatus)
  status!: BotStatus
  @HideField()
  token!: string
  @HideField()
  clientId!: string
  @HideField()
  clientSecret!: string
  @Field()
  communityId!: string
  @Field(() => GraphQLJSON, { nullable: true })
  application?: BotApplication | null
}
