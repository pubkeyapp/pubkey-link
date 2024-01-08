import { Field, InputType } from '@nestjs/graphql'
import { PagingInput } from '@pubkey-link/api-core-data-access'
import { AppUserRole } from '../entity/app-user-role.enum'

@InputType()
export class AdminFindManyAppUserInput extends PagingInput() {
  @Field()
  appId!: string
  @Field(() => AppUserRole, { nullable: true })
  role?: AppUserRole
  @Field({ nullable: true })
  search?: string
}
