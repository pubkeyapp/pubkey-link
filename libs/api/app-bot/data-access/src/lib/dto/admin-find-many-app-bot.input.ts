import { Field, InputType } from '@nestjs/graphql'
import { PagingInput } from '@pubkey-link/api-core-data-access'

@InputType()
export class AdminFindManyAppBotInput extends PagingInput() {
  @Field()
  appId!: string
  @Field({ nullable: true })
  search?: string
}
