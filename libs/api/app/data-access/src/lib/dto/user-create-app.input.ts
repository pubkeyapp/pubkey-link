import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserCreateAppInput {
  @Field()
  name!: string
}
