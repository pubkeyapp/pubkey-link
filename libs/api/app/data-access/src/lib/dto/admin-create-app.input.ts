import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminCreateAppInput {
  @Field()
  name!: string
  @Field({ nullable: true })
  avatarUrl?: string
}
