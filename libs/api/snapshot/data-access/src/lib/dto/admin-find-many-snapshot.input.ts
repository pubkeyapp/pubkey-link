import { Field, InputType } from '@nestjs/graphql'
import { PagingInput } from '@pubkey-link/api-core-data-access'

@InputType()
export class AdminFindManySnapshotInput extends PagingInput() {
  @Field({ nullable: true })
  communityId?: string
  @Field({ nullable: true })
  roleId?: string
  @Field({ nullable: true })
  search?: string
}
