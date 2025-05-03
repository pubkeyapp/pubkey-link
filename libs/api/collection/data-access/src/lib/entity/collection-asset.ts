import { Field, ObjectType } from '@nestjs/graphql'
import { CollectionAssetAttribute } from './collection-asset-attribute'

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
