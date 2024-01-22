import { Field, InputType } from '@nestjs/graphql'
import { IdentityProvider } from '../entity/identity-provider.enum'

@InputType()
export class VerifyIdentityChallengeInput {
  @Field(() => IdentityProvider)
  provider!: IdentityProvider
  @Field()
  providerId!: string
  @Field()
  challenge!: string
  @Field()
  signature!: string
  @Field({ nullable: true, defaultValue: false })
  useLedger!: boolean
}
