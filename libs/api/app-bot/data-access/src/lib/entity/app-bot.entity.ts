import { Field, ObjectType } from '@nestjs/graphql'
import { AppBotProvider } from './app-bot-provider.enum'
import { AppBotStatus } from './app-bot-status.enum'

@ObjectType()
export class AppBot {
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
  @Field(() => AppBotProvider)
  provider!: AppBotProvider
  @Field(() => AppBotStatus)
  status!: AppBotStatus
  @Field({ nullable: true })
  token?: string | null
  @Field({ nullable: true })
  clientId?: string | null
  @Field({ nullable: true })
  clientSecret?: string | null
  @Field()
  appId!: string
}
