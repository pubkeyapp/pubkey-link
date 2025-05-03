import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserCollectionCreateInput {
  @Field()
  communityId!: string
  @Field()
  tokenId!: string
}
