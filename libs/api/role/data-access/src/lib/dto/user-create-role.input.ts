import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserCreateRoleInput {
  @Field()
  communityId!: string
  @Field()
  name!: string
}
