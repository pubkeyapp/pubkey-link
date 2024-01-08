import { Field, InputType } from '@nestjs/graphql'
import { AppBotProvider } from '../entity/app-bot-provider.enum'

@InputType()
export class AdminCreateAppBotInput {
  @Field()
  name!: string
  @Field(() => AppBotProvider)
  provider!: AppBotProvider
  @Field()
  token!: string
  @Field()
  clientId!: string
  @Field()
  clientSecret!: string
  @Field()
  appId!: string
}
