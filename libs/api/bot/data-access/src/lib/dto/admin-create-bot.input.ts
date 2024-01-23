import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminCreateBotInput {
  @Field()
  token!: string
  @Field()
  clientId!: string
  @Field()
  clientSecret!: string
  @Field()
  communityId!: string
}
