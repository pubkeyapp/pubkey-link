import { Field, InputType } from '@nestjs/graphql'
import { PagingInput } from '@pubkey-link/api-core-data-access'

@InputType()
export class UserFindManyCommunityMemberInput extends PagingInput() {
  @Field()
  communityId!: string
  @Field({ nullable: true })
  admin?: boolean
  @Field({ nullable: true })
  search?: string
}
