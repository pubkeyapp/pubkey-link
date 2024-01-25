import { Field, InputType } from '@nestjs/graphql'
import { IdentityProvider } from '@pubkey-link/api-core-data-access'

@InputType()
export class AdminFindManyIdentityInput {
  @Field({ nullable: true })
  ownerId?: string

  @Field(() => IdentityProvider, { nullable: true })
  provider?: IdentityProvider
}
