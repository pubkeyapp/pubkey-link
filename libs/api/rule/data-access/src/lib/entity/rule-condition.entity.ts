import { Field, ObjectType } from '@nestjs/graphql'

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
}
