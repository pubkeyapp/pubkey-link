import { Field, InputType } from '@nestjs/graphql'
import { IdentityProvider } from '../entity/identity-provider.enum'

@InputType()
export class AdminFindManyIdentityInput {
  @Field({ nullable: true })
  ownerId?: string

  @Field(() => IdentityProvider, { nullable: true })
  provider?: IdentityProvider
}
