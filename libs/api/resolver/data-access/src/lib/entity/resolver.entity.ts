import { Field, ObjectType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { PagingResponse } from '@pubkey-link/api-core-data-access'
import { Network, NetworkCluster } from '@pubkey-link/api-network-data-access'
import { GraphQLJSON } from 'graphql-scalars'
import { ResolverType } from './resolver-type.enum'

@ObjectType()
export class Resolver {
  @Field()
  id!: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field(() => NetworkCluster)
  cluster!: NetworkCluster
  @Field(() => ResolverType)
  type!: ResolverType
  @Field()
  name!: string
  @Field(() => GraphQLJSON, { nullable: true })
  config?: Prisma.JsonValue

  @Field(() => Network, { nullable: true })
  network?: Network
}

@ObjectType()
export class ResolverPaging extends PagingResponse<Resolver>(Resolver) {}
