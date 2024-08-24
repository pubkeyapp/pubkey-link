import { Field, HideField, ObjectType } from '@nestjs/graphql'
import { PagingResponse } from '@pubkey-link/api-core-data-access'
import { User } from '@pubkey-link/api-user-data-access'
import { CommunityMemberRole } from './community-member-role.entity'

@ObjectType()
export class CommunityMember {
  @Field()
  id!: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field()
  admin!: boolean
  @Field(() => User, { nullable: true })
  user?: User
  @HideField()
  roles?: CommunityMemberRole[]
  @Field()
  userId!: string
  @Field()
  communityId!: string
}

@ObjectType()
export class CommunityMemberPaging extends PagingResponse<CommunityMember>(CommunityMember) {}
