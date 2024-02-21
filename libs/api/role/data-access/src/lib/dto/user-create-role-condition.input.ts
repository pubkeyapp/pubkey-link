import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { NetworkTokenType } from '@pubkey-link/api-network-token-data-access'
import { GraphQLJSON } from 'graphql-scalars'

@InputType()
export class UserCreateRoleConditionInput {
  @Field()
  roleId!: string
  @Field(() => NetworkTokenType)
  type!: NetworkTokenType
  @Field()
  tokenId!: string
  @Field({ nullable: true })
  amount?: string | null
  @Field({ nullable: true })
  amountMax?: string | null
  @Field(() => GraphQLJSON, { nullable: true })
  config?: Prisma.InputJsonValue | null
  @Field(() => GraphQLJSON, { nullable: true })
  filters?: Prisma.InputJsonValue | null
}
