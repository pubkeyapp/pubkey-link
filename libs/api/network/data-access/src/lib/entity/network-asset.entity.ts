import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class NetworkAsset {
  @Field(() => [String])
  accounts!: string[]
  @Field()
  amount!: string
  @Field()
  owner!: string
}
