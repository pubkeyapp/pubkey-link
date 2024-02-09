import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { NetworkCluster } from '@pubkey-link/api-network-data-access'
import { NetworkTokenType } from '@pubkey-link/api-network-token-data-access'
import { GraphQLJSON } from 'graphql-scalars'

@ObjectType()
export class NetworkAsset {
  @Field()
  id!: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field(() => NetworkTokenType)
  type!: NetworkTokenType
  @Field(() => NetworkCluster)
  cluster!: NetworkCluster
  @Field()
  account!: string
  @Field()
  name!: string
  @Field({ nullable: true })
  symbol?: string | null
  @Field({ nullable: true })
  balance?: string | null
  @Field({ nullable: true })
  program!: string | null
  @Field(() => Int)
  decimals!: number
  @Field()
  mint!: string
  @Field()
  owner!: string
  @Field({ nullable: true })
  group?: string | null
  @Field({ nullable: true })
  imageUrl?: string | null
  @Field(() => GraphQLJSON, { nullable: true })
  attributes?: Prisma.JsonValue | null
  @Field(() => GraphQLJSON, { nullable: true })
  metadata?: Prisma.JsonValue | null
}
