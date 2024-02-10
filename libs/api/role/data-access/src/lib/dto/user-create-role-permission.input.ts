import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserCreateRolePermissionInput {
  @Field()
  roleId!: string
  @Field()
  botId!: string
  @Field()
  serverId!: string
  @Field()
  serverRoleId!: string
}
