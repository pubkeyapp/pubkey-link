import { Field, ObjectType } from '@nestjs/graphql'
import { PagingResponse } from '@pubkey-link/api-core-data-access'

@ObjectType()
export class Allocation {
  @Field()
  id!: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date

  @Field()
  name!: string

  @Field({ nullable: true })
  description?: string

  @Field()
  url!: string
}

@ObjectType()
export class AllocationPaging extends PagingResponse<Allocation>(Allocation) {}
