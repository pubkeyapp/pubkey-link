import { Field, HideField, ObjectType } from '@nestjs/graphql'
import { Role } from './role.entity'

@ObjectType()
export class RolePermission {
  @Field()
  id!: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field(() => Role, { nullable: true })
  role?: Role
  @Field({ nullable: true })
  roleId!: string
  @Field({ nullable: true })
  botId!: string
  @HideField()
  botRole?: unknown
}
