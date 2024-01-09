import { Field, InputType } from '@nestjs/graphql'
import { PagingInput } from '@pubkey-link/api-core-data-access'

@InputType()
export class UserFindManyAppInput extends PagingInput() {
  @Field({ nullable: true })
  search?: string
}
