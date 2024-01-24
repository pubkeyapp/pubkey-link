import { Field, HideField, ObjectType } from '@nestjs/graphql'
import { User } from '@pubkey-link/api-user-data-access'
import { GraphQLJSON } from 'graphql-scalars'
import { IdentityChallenge } from './identity-challenge.entity'
import { IdentityProvider } from './identity-provider.enum'

@ObjectType()
export class Identity {
  @Field()
  id!: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date

  @Field(() => IdentityProvider)
  provider!: IdentityProvider
  @Field()
  providerId!: string
  @Field({ nullable: true })
  name?: string
  @Field(() => GraphQLJSON, { nullable: true })
  profile?: JSON
  @Field({ nullable: true })
  verified?: boolean
  @Field(() => User, { nullable: true })
  owner?: User
  @Field(() => [IdentityChallenge], { nullable: true })
  challenges?: IdentityChallenge[]
  @HideField()
  accessToken?: string
  @HideField()
  refreshToken?: string
}
