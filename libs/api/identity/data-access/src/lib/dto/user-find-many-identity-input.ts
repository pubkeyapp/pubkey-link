import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserFindManyIdentityInput {
  @Field()
  username!: string
}
