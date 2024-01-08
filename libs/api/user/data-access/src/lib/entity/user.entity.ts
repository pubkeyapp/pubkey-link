import { Field, HideField, ObjectType } from '@nestjs/graphql'
import { UserRole } from './user-role.enum'
import { UserStatus } from './user-status.enum'

@ObjectType()
export class User {
  @Field()
  id!: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field(() => UserRole, { nullable: true })
  role?: UserRole
  @Field(() => UserStatus, { nullable: true })
  status?: UserStatus
  @Field({ nullable: true })
  avatarUrl?: string | null
  @Field({ nullable: true })
  developer!: boolean
  @Field({ nullable: true })
  name?: string | null
  @Field({ nullable: true })
  username!: string
  @HideField()
  identities?: unknown[] | null
}
