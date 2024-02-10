import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserCreateRoleInput {
  @Field()
  communityId!: string

  @Field()
  name!: string

  @Field({ nullable: true })
  description?: string
}
