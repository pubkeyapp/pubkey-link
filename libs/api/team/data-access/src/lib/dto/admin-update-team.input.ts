import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminUpdateTeamInput {
  @Field({ nullable: true })
  name?: string
  @Field({ nullable: true })
  avatarUrl?: string
  @Field({ nullable: true })
  ownerId?: string
}
