import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserCollectionFindManyInput {
  @Field()
  communityId!: string
  @Field({ nullable: true })
  search?: string
}

@InputType()
export class UserCollectionAssetFindManyInput {
  @Field()
  collectionId!: string
  @Field({ nullable: true })
  search?: string
  @Field({ nullable: true })
  searchByOwnerWallet?: string
}
