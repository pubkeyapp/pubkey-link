import { Field, ObjectType } from '@nestjs/graphql'
import { StatRecord } from './stat-record'

@ObjectType()
export class StatRecordGroup {
  @Field()
  name!: string
  @Field(() => [StatRecord])
  records!: StatRecord[]
}
