import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminUpdateBotInput {
  @Field({ nullable: true })
  name?: string
  @Field({ nullable: true })
  avatarUrl?: string
  @Field({ nullable: true })
  token?: string
  @Field({ nullable: true })
  clientId?: string
  @Field({ nullable: true })
  clientSecret?: string
  @Field({ nullable: true })
  communityId?: string
}
