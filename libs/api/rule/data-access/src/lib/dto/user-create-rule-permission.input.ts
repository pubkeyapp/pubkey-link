import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserCreateRulePermissionInput {
  @Field()
  ruleId!: string
  @Field()
  botId!: string
  @Field()
  serverId!: string
  @Field()
  roleId!: string
}
