import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class AppConfig {
  @Field()
  authDiscordEnabled!: boolean
  @Field()
  authGithubEnabled!: boolean
  @Field()
  authGoogleEnabled!: boolean
  @Field()
  authPasswordEnabled!: boolean
  @Field()
  authRegisterEnabled!: boolean
  @Field()
  authSolanaEnabled!: boolean
  @Field()
  authTwitterEnabled!: boolean
}
