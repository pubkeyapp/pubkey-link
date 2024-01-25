import { Field, ObjectType } from '@nestjs/graphql'
import { IdentityProvider } from './identity-provider.enum'

@ObjectType()
export class AppConfig {
  @Field(() => [IdentityProvider], { nullable: true })
  authLoginProviders!: IdentityProvider[]
  @Field(() => [IdentityProvider], { nullable: true })
  authLinkProviders!: IdentityProvider[]
  @Field()
  authPasswordEnabled!: boolean
  @Field()
  authRegisterEnabled!: boolean
}
