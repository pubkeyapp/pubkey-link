import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserCollectionFindOneInput {
  @Field()
  communityId!: string
  @Field()
  collectionId!: string
}

@InputType()
export class UserCollectionAssetFindOneInput {
  @Field()
  collectionId!: string
  @Field()
  assetId!: string
}
