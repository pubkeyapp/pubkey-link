import { Field, ObjectType } from '@nestjs/graphql'
import { NetworkToken } from '@pubkey-link/api-network-token-data-access'
import { CollectionAsset } from './collection-asset'
import { CollectionAssetAttribute } from './collection-asset-attribute'

@ObjectType()
export class Collection {
  @Field()
  id!: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field()
  name!: string
  @Field()
  slug!: string
  @Field()
  description?: string | null
  @Field()
  imageUrl?: string | null
  @Field(() => NetworkToken, { nullable: true })
  token?: NetworkToken | null
  @Field(() => [CollectionAsset], { nullable: true })
  assets?: CollectionAsset[]
  @Field(() => [CollectionAssetAttribute], { nullable: true })
  attributes?: CollectionAssetAttribute[]
}
