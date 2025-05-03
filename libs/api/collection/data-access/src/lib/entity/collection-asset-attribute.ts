import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class CollectionAssetAttribute {
  @Field()
  key!: string
  @Field({ nullable: true })
  value!: string
  @Field(() => Int, { nullable: true })
  count?: number
}
