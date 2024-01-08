import { Type } from '@nestjs/common'
import { Field, ObjectType } from '@nestjs/graphql'
import { PagingMeta } from './paging-meta.entity'

export function PagingResponse<T>(classRef: Type<T>) {
  @ObjectType({ isAbstract: true })
  abstract class PagingResponseClass {
    @Field(() => [classRef])
    data!: T[]

    @Field(() => PagingMeta)
    meta!: PagingMeta
  }

  return PagingResponseClass
}
