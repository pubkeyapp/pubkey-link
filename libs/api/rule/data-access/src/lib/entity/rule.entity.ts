import { Field, ObjectType } from '@nestjs/graphql'
import { RuleCondition } from './rule-condition.entity'
import { RulePermission } from './rule-permission.entity'

@ObjectType()
export class Rule {
  @Field()
  id!: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field()
  communityId!: string
  @Field()
  name!: string
  @Field({ nullable: true })
  description?: string | null
  @Field(() => [RuleCondition], { nullable: true })
  conditions?: RuleCondition[]
  @Field(() => [RulePermission], { nullable: true })
  permissions?: RulePermission[]
}
