import { Field, Float, ObjectType } from '@nestjs/graphql'
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

@ObjectType()
export class CollectionAssetWithDetails extends CollectionAsset {
  @Field(() => String, { nullable: true })
  jsonMetadataUrl?: string | null
  @Field(() => String, { nullable: true })
  onChainCollectionAddress?: string | null
  @Field(() => Float, { nullable: true })
  royalty?: number | null
  @Field(() => Boolean)
  isCompressed!: boolean
  @Field(() => String, { nullable: true })
  assetType?: string | null
}
