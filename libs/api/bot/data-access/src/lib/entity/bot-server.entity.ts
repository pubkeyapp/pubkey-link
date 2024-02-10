import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class BotServer {
  @Field()
  id!: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field()
  name!: string
  @Field()
  serverId!: string
  @Field()
  botId!: string
}
