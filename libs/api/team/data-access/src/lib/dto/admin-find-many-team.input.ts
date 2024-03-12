import { Field, InputType } from '@nestjs/graphql'
import { PagingInput } from '@pubkey-link/api-core-data-access'

@InputType()
export class AdminFindManyTeamInput extends PagingInput() {
  @Field(() => String)
  communityId!: string

  @Field({ nullable: true })
  search?: string
}
