import { Field, InputType } from '@nestjs/graphql'
import { CommunityRole } from '../entity/community-role.enum'

@InputType()
export class UserAddCommunityMemberInput {
  @Field()
  userId!: string
  @Field(() => CommunityRole)
  role!: CommunityRole
}
