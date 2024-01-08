import { Field, InputType } from '@nestjs/graphql'
import { AppBotStatus } from '../entity/app-bot-status.enum'

@InputType()
export class AdminUpdateAppBotInput {
  @Field({ nullable: true })
  name?: string
  @Field(() => AppBotStatus, { nullable: true })
  status?: AppBotStatus
  @Field({ nullable: true })
  token?: string
  @Field({ nullable: true })
  clientId?: string
  @Field({ nullable: true })
  clientSecret?: string
}
