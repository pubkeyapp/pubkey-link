import { Field, InputType } from '@nestjs/graphql'
import { AppUserRole } from '../entity/app-user-role.enum'

@InputType()
export class UserCreateAppUserInput {
  @Field(() => AppUserRole)
  role!: AppUserRole
  @Field()
  appId!: string
  @Field()
  userId!: string
}
