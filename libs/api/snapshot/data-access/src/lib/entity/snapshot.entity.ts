import { Field, ObjectType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { Role } from '@pubkey-link/api-role-data-access'
import { GraphQLJSON } from 'graphql-scalars'

@ObjectType()
export class Snapshot {
  @Field()
  id!: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date

  @Field(() => Role, { nullable: true })
  role?: Role

  @Field()
  roleId!: string

  @Field()
  name!: string

  @Field(() => GraphQLJSON, { nullable: true })
  data!: Prisma.JsonValue
}
