import { Field, HideField, ObjectType } from '@nestjs/graphql'
import { Rule } from './rule.entity'

@ObjectType()
export class RulePermission {
  @Field()
  id!: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field(() => Rule, { nullable: true })
  rule?: Rule
  @Field({ nullable: true })
  ruleId!: string
  @Field({ nullable: true })
  botId!: string
  @HideField()
  bot?: unknown
}
