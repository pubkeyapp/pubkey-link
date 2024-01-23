import { Field, InputType } from '@nestjs/graphql'
import { PagingInput } from '@pubkey-link/api-core-data-access'
import { CommunityRole } from '../entity/community-role.enum'

@InputType()
export class AdminFindManyCommunityMemberInput extends PagingInput() {
  @Field()
  communityId!: string
  @Field(() => CommunityRole, { nullable: true })
  role?: CommunityRole
  @Field({ nullable: true })
  search?: string
}
