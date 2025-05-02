import { Field, ObjectType } from '@nestjs/graphql'
import { GraphQLJSON } from 'graphql-scalars'

@ObjectType()
export class ScheduledJob {
  @Field()
  name!: string
  @Field(() => GraphQLJSON, { nullable: true })
  job!: Record<string, string>
}
