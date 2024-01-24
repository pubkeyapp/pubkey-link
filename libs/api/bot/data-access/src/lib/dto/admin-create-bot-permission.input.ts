import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminCreateBotPermissionInput {
  @Field()
  botId!: string
  @Field()
  serverId!: string
  @Field()
  roleId!: string
}
