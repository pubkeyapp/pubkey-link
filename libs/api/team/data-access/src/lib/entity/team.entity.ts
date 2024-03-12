import { Field, ObjectType } from '@nestjs/graphql'
import { Community } from '@pubkey-link/api-community-data-access'
import { CommunityMember } from '@pubkey-link/api-community-member-data-access'
import { PagingResponse } from '@pubkey-link/api-core-data-access'
import { User } from '@pubkey-link/api-user-data-access'

@ObjectType()
export class Team {
  @Field()
  id!: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field()
  name!: string
  @Field({ nullable: true })
  avatarUrl?: string | null
  @Field(() => [CommunityMember], { nullable: true })
  members?: CommunityMember[]
  @Field()
  communityId!: string
  @Field(() => Community, { nullable: true })
  community?: Community
  @Field()
  ownerId!: string
  @Field(() => User, { nullable: true })
  owner?: User
}

@ObjectType()
export class TeamPaging extends PagingResponse<Team>(Team) {}
