import { Field, InputType, Int } from '@nestjs/graphql'

export function PagingInput() {
  @InputType()
  abstract class PagingInputClass {
    @Field(() => Int, { nullable: true, defaultValue: 1 })
    page?: number
    @Field(() => Int, { nullable: true, defaultValue: 10 })
    limit?: number
  }

  return PagingInputClass
}

export interface PagingInputFields {
  page?: number
  limit?: number
}
