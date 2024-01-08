import { Field, ObjectType } from '@nestjs/graphql'
import { User } from '@pubkey-link/api-user-data-access'
import { AppUserRole } from './app-user-role.enum'

@ObjectType()
export class AppUser {
  @Field()
  id!: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field(() => AppUserRole)
  role!: AppUserRole
  @Field()
  appId!: string
  @Field()
  userId!: string
  @Field(() => User, { nullable: true })
  user?: User | null
}
