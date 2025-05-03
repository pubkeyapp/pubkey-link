import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserCollectionFindManyInput {
  @Field()
  communityId!: string
  @Field({ nullable: true })
  search?: string
}
