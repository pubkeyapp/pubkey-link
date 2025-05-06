import { Field, InputType } from '@nestjs/graphql'
import { NetworkCluster, Prisma, ResolverType } from '@prisma/client'
import { GraphQLJSON } from 'graphql-scalars'

@InputType()
export class AdminCreateResolverInput {
  @Field(() => NetworkCluster)
  cluster!: NetworkCluster

  @Field(() => ResolverType)
  type!: ResolverType

  @Field(() => GraphQLJSON, { nullable: true })
  config?: Prisma.InputJsonValue
}
