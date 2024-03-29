import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminUpdateCommunityInput {
  @Field({ nullable: true })
  name?: string
  @Field({ nullable: true })
  enableSync?: boolean
  @Field({ nullable: true })
  featured?: boolean
  @Field({ nullable: true })
  avatarUrl?: string
  @Field({ nullable: true })
  description?: string
  @Field({ nullable: true })
  websiteUrl?: string
  @Field({ nullable: true })
  discordUrl?: string
  @Field({ nullable: true })
  githubUrl?: string
  @Field({ nullable: true })
  twitterUrl?: string
  @Field({ nullable: true })
  telegramUrl?: string
}
