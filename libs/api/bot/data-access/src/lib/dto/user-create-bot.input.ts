import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserCreateBotInput {
  @Field()
  token!: string
  @Field()
  clientId!: string
  @Field()
  clientSecret!: string
  @Field()
  communityId!: string
}
