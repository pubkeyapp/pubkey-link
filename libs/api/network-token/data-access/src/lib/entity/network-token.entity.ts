import { Field, ObjectType } from '@nestjs/graphql'
import { NetworkCluster } from '@pubkey-link/api-network-data-access'
import { NetworkTokenType } from './network-token-type.enum'
import { Prisma } from '@prisma/client'
import { GraphQLJSON } from 'graphql-scalars'

@ObjectType()
export class NetworkToken {
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
  @Field()
  program!: string
  @Field({ nullable: true })
  imageUrl?: string | null
  @Field({ nullable: true })
  metadataUrl?: string | null
  @Field({ nullable: true })
  description?: string | null
  @Field({ nullable: true })
  symbol?: string | null
  @Field(() => GraphQLJSON, { nullable: true })
  raw?: Prisma.JsonValue | null
}
