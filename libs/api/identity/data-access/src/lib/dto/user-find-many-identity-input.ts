import { Field, InputType } from '@nestjs/graphql'
import { IdentityProvider } from '@pubkey-link/api-core-data-access'

@InputType()
export class UserFindManyIdentityInput {
  @Field(() => IdentityProvider, { nullable: true })
  provider?: IdentityProvider
  @Field()
  username!: string
}
