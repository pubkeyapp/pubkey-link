import { Field, HideField, ObjectType } from '@nestjs/graphql'
import { Prisma, Role } from '@prisma/client'
import { GraphQLJSON } from 'graphql-scalars'

@ObjectType()
export class Snapshot {
  @Field()
  id!: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field()
  roleId!: string
  @Field()
  name!: string
  @Field(() => GraphQLJSON, { nullable: true })
  data!: Prisma.JsonValue
  @HideField()
  role?: Role
}

export interface SnapshotAsset {
  account: string
  balance: string
  mint: string
  owner: string
}

export interface SnapshotOwner {
  username: string
  discordId: string
}
