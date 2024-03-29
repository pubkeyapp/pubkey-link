import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserUpdateIdentityInput {
  @Field({ nullable: true })
  name?: string
}
