import { Field, InputType } from '@nestjs/graphql'
import { CommunityRole } from '../entity/community-role.enum'

@InputType()
export class AdminUpdateCommunityMemberInput {
  @Field(() => CommunityRole)
  role!: CommunityRole
}
