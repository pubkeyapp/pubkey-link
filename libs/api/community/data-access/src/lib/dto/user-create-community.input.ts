import { Field, InputType } from '@nestjs/graphql'
import { NetworkCluster } from '@pubkey-link/api-network-data-access'

@InputType()
export class UserCreateCommunityInput {
  @Field(() => NetworkCluster)
  cluster!: NetworkCluster
  @Field()
  name!: string
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
