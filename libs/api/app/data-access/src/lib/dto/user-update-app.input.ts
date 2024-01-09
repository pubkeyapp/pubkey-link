import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserUpdateAppInput {
  @Field({ nullable: true })
  name?: string
  @Field({ nullable: true })
  avatarUrl?: string
}
