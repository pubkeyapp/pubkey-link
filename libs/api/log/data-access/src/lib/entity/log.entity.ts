import { Field, ObjectType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { IdentityProvider } from '@pubkey-link/api-core-data-access'
import { GraphQLJSON } from 'graphql-scalars'
import { LogLevel } from './log-level.enum'
import { LogRelatedType } from './log-related-type.enum'

@ObjectType()
export class Log {
  @Field()
  id!: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field()
  message!: string
  @Field(() => GraphQLJSON, { nullable: true })
  data?: Prisma.JsonValue | null
  @Field(() => LogLevel)
  level!: LogLevel
  @Field({ nullable: true })
  relatedId?: string | null
  @Field(() => LogRelatedType, { nullable: true })
  relatedType?: LogRelatedType | null
  @Field()
  communityId!: string
  @Field(() => IdentityProvider, { nullable: true })
  identityProvider?: IdentityProvider | null
  @Field({ nullable: true })
  identityProviderId?: string | null
  @Field({ nullable: true })
  botId?: string | null
  @Field({ nullable: true })
  userId?: string | null
  @Field({ nullable: true })
  ruleId?: string | null
}
