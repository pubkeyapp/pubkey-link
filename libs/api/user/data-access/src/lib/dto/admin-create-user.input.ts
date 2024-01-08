import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminCreateUserInput {
  @Field()
  username!: string
  @Field({ nullable: true })
  password?: string | undefined
}
