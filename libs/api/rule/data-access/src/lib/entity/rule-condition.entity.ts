import { Field, ObjectType } from '@nestjs/graphql'
import { RuleConditionType } from './rule-condition-type.enum'
import { GraphQLJSON } from 'graphql-scalars'
import { Prisma } from '@prisma/client'

@ObjectType()
export class RuleCondition {
  @Field()
  id!: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field()
  name!: string
  @Field(() => RuleConditionType, { nullable: true })
  type!: RuleConditionType
  @Field()
  account!: string
  @Field({ nullable: true })
  amount?: string | null
  @Field(() => GraphQLJSON, { nullable: true })
  filters?: Prisma.JsonValue | null
}
