import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { GraphQLJSON } from 'graphql-scalars'

@InputType()
export class AdminUpdateResolverInput {
  @Field({ nullable: true })
  name?: string

  @Field(() => GraphQLJSON, { nullable: true })
  config?: Prisma.InputJsonValue
}
