import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminUpdateRoleInput {
  @Field({ nullable: true })
  name?: string
}
