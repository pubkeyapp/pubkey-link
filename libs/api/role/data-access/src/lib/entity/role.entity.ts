import { Field, ObjectType } from '@nestjs/graphql'
import { RoleCondition } from './role-condition.entity'
import { RolePermission } from './role-permission.entity'

@ObjectType()
export class Role {
  @Field()
  id!: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field()
  communityId!: string
  @Field()
  name!: string
  @Field(() => [RoleCondition], { nullable: true })
  conditions?: RoleCondition[] | null
  @Field(() => [RolePermission], { nullable: true })
  permissions?: RolePermission[] | null
}
