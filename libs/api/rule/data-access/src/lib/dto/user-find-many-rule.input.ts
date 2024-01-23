import { Field, InputType } from '@nestjs/graphql'
import { PagingInput } from '@pubkey-link/api-core-data-access'

@InputType()
export class UserFindManyRuleInput extends PagingInput() {
  @Field()
  communityId!: string
  @Field({ nullable: true })
  search?: string
}
