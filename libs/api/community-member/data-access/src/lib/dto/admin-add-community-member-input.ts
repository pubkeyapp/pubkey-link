import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminAddCommunityMemberInput {
  @Field()
  userId!: string
  @Field()
  admin!: boolean
}
