import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminUpdateAllocationInput {
  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  description?: string

  @Field({ nullable: true })
  url?: string
}
