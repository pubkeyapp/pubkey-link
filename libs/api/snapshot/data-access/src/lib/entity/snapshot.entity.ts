import { Field, HideField, ObjectType } from '@nestjs/graphql'
import { Prisma, Role } from '@prisma/client'
import { PagingResponse } from '@pubkey-link/api-core-data-access'
import { SnapshotItem } from './snapshot-item'

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
  @Field(() => [SnapshotItem], { nullable: true })
  data!: Prisma.JsonValue
  @HideField()
  role?: Role
}
@ObjectType()
export class SnapshotPaging extends PagingResponse<Snapshot>(Snapshot) {}
