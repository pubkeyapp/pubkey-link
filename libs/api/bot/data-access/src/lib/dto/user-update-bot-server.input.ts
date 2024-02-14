import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserUpdateBotServerInput {
  @Field({ nullable: true })
  name?: string
}
