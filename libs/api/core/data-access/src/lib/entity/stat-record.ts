import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class StatRecord {
  @Field()
  name!: string
  @Field()
  value!: string
}
