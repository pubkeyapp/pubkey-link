import { Field, InputType } from '@nestjs/graphql'
import { CommunityRole } from '../entity/community-role.enum'

@InputType()
export class AdminCreateCommunityMemberInput {
  @Field()
  communityId!: string
  @Field()
  userId!: string
  @Field(() => CommunityRole)
  role!: CommunityRole
}
