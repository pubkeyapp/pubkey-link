import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserCreateRoleConditionInput {
  @Field()
  roleId!: string
  @Field()
  tokenId!: string
}
