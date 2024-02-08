import { Field, HideField, ObjectType } from '@nestjs/graphql'
import { IdentityProvider } from '@pubkey-link/api-core-data-access'
import { User } from '@pubkey-link/api-user-data-access'
import { GraphQLJSON } from 'graphql-scalars'
import { IdentityChallenge } from './identity-challenge.entity'

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
  @Field({ nullable: true })
  ownerId?: string
  @Field(() => [IdentityChallenge], { nullable: true })
  challenges?: IdentityChallenge[]
  @HideField()
  accessToken?: string
  @HideField()
  refreshToken?: string
}
