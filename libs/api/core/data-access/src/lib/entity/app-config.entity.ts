import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { IdentityProvider } from './identity-provider.enum'

@ObjectType()
export class AppConfig {
  @Field(() => [IdentityProvider], { nullable: true })
  authLoginProviders!: IdentityProvider[]
  @Field(() => [IdentityProvider], { nullable: true })
  authLinkProviders!: IdentityProvider[]
  @Field(() => [AppFeature])
  features!: AppFeature[]
}

export enum AppFeature {
  CommunityCreate = 'CommunityCreate',
}

registerEnumType(AppFeature, { name: 'AppFeature' })
