import { Field, ObjectType } from '@nestjs/graphql'
import { NetworkCluster } from '@pubkey-link/api-network-data-access'
import { Role } from '@pubkey-link/api-role-data-access'

@ObjectType()
export class Community {
  @Field()
  id!: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field()
  name!: string
  @Field({ nullable: true })
  enableSync?: boolean
  @Field({ nullable: true })
  avatarUrl?: string | null
  @Field({ nullable: true })
  description?: string | null
  @Field({ nullable: true })
  websiteUrl?: string | null
  @Field({ nullable: true })
  discordUrl?: string | null
  @Field({ nullable: true })
  githubUrl?: string | null
  @Field({ nullable: true })
  twitterUrl?: string | null
  @Field({ nullable: true })
  telegramUrl?: string | null
  @Field(() => NetworkCluster)
  cluster!: NetworkCluster
  @Field(() => [Role], { nullable: true })
  roles?: Role[]
}
