import { Field, InputType } from '@nestjs/graphql'
import { CommunityRole } from '../entity/community-role.enum'

@InputType()
export class UserUpdateCommunityMemberInput {
  @Field(() => CommunityRole)
  role!: CommunityRole
}
