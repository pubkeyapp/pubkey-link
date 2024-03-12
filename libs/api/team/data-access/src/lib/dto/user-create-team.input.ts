import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserCreateTeamInput {
  @Field()
  name!: string

  @Field(() => String)
  communityId!: string
}
