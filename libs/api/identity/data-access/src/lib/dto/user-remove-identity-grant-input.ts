import { Field, InputType } from '@nestjs/graphql'
import { IdentityProvider } from '@pubkey-link/api-core-data-access'

@InputType()
export class UserRemoveIdentityGrantInput {
  @Field(() => IdentityProvider)
  provider!: IdentityProvider
  @Field()
  providerId!: string
  @Field()
  granteeId!: string
}
