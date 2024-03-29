import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { IdentityProvider } from './identity-provider.enum'

@ObjectType()
export class AppConfig {
  @Field({ nullable: true })
  appLogoUrlDark?: string
  @Field({ nullable: true })
  appLogoUrlLight?: string
  @Field({ nullable: true })
  appThemeBackground?: string
  @Field({ nullable: true })
  appThemeColor?: string
  @Field(() => [IdentityProvider], { nullable: true })
  authLoginProviders!: IdentityProvider[]
  @Field(() => [IdentityProvider], { nullable: true })
  authLinkProviders!: IdentityProvider[]
  @Field(() => [AppFeature])
  features!: AppFeature[]
}

export enum AppFeature {
  CommunityCreate = 'CommunityCreate',
  CommunitySnapshots = 'CommunitySnapshots',
  CommunityTeams = 'CommunityTeams',
}

registerEnumType(AppFeature, { name: 'AppFeature' })
