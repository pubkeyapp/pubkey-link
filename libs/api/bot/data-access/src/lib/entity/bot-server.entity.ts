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
  serverId!: string
  @Field()
  botId!: string
  @Field({ nullable: true })
  enableSync?: boolean
  @Field({ nullable: true })
  mentionUsers?: boolean
  @Field({ nullable: true })
  mentionRoles?: boolean
  @Field({ nullable: true })
  adminRole?: string
  @Field({ nullable: true })
  commandChannel?: string
  @Field({ nullable: true })
  dryRun?: boolean
  @Field({ nullable: true })
  verbose?: boolean
}
