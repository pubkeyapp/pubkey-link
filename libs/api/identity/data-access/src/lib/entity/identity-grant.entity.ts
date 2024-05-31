import { Field, ObjectType } from '@nestjs/graphql'
import { IdentityProvider } from '@pubkey-link/api-core-data-access'
import { User } from '@pubkey-link/api-user-data-access'

@ObjectType()
export class IdentityGrant {
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
  @Field()
  granteeId!: string
  @Field(() => User, { nullable: true })
  grantee?: User
}
