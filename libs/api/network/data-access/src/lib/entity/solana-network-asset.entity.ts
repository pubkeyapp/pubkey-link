import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class SolanaNetworkAsset {
  @Field(() => [String])
  accounts!: string[]
  @Field()
  amount!: string
  @Field({ nullable: true })
  group?: string
  @Field()
  owner!: string
}
