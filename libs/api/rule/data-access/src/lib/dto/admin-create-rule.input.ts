import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminCreateRuleInput {
  @Field()
  communityId!: string
  @Field()
  name!: string
  @Field({ nullable: true })
  description?: string
}
