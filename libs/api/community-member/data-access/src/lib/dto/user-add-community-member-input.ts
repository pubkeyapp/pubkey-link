import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserAddCommunityMemberInput {
  @Field()
  userId!: string
  @Field()
  admin!: boolean
}
