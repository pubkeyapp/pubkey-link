import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { GraphQLJSON } from 'graphql-scalars'

@InputType()
export class UserUpdateRoleConditionInput {
  @Field({ nullable: true })
  amount?: string | null
  @Field(() => GraphQLJSON, { nullable: true })
  config?: Prisma.InputJsonValue | null
  @Field(() => GraphQLJSON, { nullable: true })
  filters?: Prisma.InputJsonValue | null
}
