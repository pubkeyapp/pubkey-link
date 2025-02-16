import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminCreateAllocationInput {
  @Field()
  name!: string

  @Field({ nullable: true })
  description?: string

  @Field()
  url!: string
}
