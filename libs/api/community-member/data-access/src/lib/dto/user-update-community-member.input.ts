import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserUpdateCommunityMemberInput {
  @Field()
  admin!: boolean
}
