import { Field, HideField, ObjectType } from '@nestjs/graphql'
import { Bot, Identity, NetworkAsset, Prisma, Role, User } from '@prisma/client'
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
  @Field({ nullable: true })
  communityId?: string | null
  @Field(() => IdentityProvider, { nullable: true })
  identityProvider?: IdentityProvider | null
  @Field({ nullable: true })
  identityProviderId?: string | null
  @HideField()
  identity?: Identity | null
  @Field({ nullable: true })
  networkAssetId?: string | null
  @Field({ nullable: true })
  botId?: string | null
  @HideField()
  bot?: Bot | null
  @HideField()
  networkAsset?: NetworkAsset | null
  @Field({ nullable: true })
  userId?: string | null
  @HideField()
  user?: User | null
  @Field({ nullable: true })
  roleId?: string | null
  @HideField()
  role?: Role | null
}
