import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class BotMember {
  @Field()
  memberId!: string
  @Field(() => [String], { nullable: true })
  roleIds!: string[]
}
