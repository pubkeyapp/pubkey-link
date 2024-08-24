import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminUpdateCommunityMemberInput {
  @Field()
  admin!: boolean
}
