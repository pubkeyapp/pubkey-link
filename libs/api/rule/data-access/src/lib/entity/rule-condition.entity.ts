import { Field, ObjectType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { SolanaNetworkAsset } from '@pubkey-link/api-network-data-access'
import { NetworkToken } from '@pubkey-link/api-network-token-data-access'
import { GraphQLJSON } from 'graphql-scalars'
import { RuleConditionType } from './rule-condition-type.enum'

@ObjectType()
export class RuleCondition {
  @Field()
  id!: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field(() => RuleConditionType)
  type!: RuleConditionType
  @Field({ nullable: true })
  account?: string | null
  @Field({ nullable: true })
  amount?: string | null
  @Field(() => GraphQLJSON, { nullable: true })
  config?: Prisma.JsonValue | null
  @Field(() => GraphQLJSON, { nullable: true })
  filters?: Prisma.JsonValue | null
  @Field({ nullable: true })
  token?: NetworkToken | null
  @Field({ nullable: true })
  tokenId?: string | null
  @Field(() => SolanaNetworkAsset, { nullable: true })
  asset?: SolanaNetworkAsset | null
  @Field({ nullable: true })
  valid?: boolean | null
}
