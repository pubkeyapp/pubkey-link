import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class PagingMeta {
  @Field(() => Int)
  currentPage!: number
  @Field(() => Int, { nullable: true })
  nextPage?: number | null
  @Field(() => Int, { nullable: true })
  previousPage?: number | null
  @Field()
  isFirstPage!: boolean
  @Field()
  isLastPage!: boolean
  @Field(() => Int, { nullable: true })
  pageCount?: number
  @Field(() => Int, { nullable: true })
  totalCount?: number
}
