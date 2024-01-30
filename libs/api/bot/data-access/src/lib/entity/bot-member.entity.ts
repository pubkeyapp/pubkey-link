import { Field, ObjectType } from '@nestjs/graphql'
import { IdentityProvider } from '@pubkey-link/api-core-data-access'
import { Identity } from '@pubkey-link/api-identity-data-access'

@ObjectType()
export class BotMember {
  @Field()
  id!: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field()
  botId!: string
  @Field()
  userId!: string
  @Field()
  serverId!: string
  @Field(() => Identity, { nullable: true })
  identity?: Identity
  @Field(() => IdentityProvider)
  identityProvider!: IdentityProvider
}
