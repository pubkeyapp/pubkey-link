import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserUpdateTeamInput {
  @Field({ nullable: true })
  name?: string
  @Field({ nullable: true })
  avatarUrl?: string
}
