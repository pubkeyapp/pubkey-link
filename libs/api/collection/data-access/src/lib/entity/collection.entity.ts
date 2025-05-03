import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Collection {
  @Field()
  id!: string
  @Field()
  name!: string
  @Field()
  description?: string
  @Field()
  imageUrl?: string
  @Field(() => [CollectionAsset], { nullable: true })
  assets?: CollectionAsset[]
  @Field(() => [CollectionAssetAttribute], { nullable: true })
  attributes?: CollectionAssetAttribute[]
}

@ObjectType()
export class CollectionAsset {
  @Field()
  id!: string
  @Field()
  name!: string
  @Field()
  description?: string
  @Field()
  imageUrl?: string
  @Field()
  owner?: string
  @Field(() => [CollectionAssetAttribute], { nullable: true })
  attributes?: CollectionAssetAttribute[]
}

@ObjectType()
export class CollectionAssetAttribute {
  @Field()
  key!: string
  @Field({ nullable: true })
  value!: string
  @Field(() => Int, { nullable: true })
  count?: number
}
