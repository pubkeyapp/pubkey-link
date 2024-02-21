import { Field, InputType } from '@nestjs/graphql'
import { PagingInput } from '@pubkey-link/api-core-data-access'

@InputType()
export class UserFindManySnapshotInput extends PagingInput() {
  @Field()
  communityId!: string
  @Field({ nullable: true })
  roleId?: string
  @Field({ nullable: true })
  search?: string
}
