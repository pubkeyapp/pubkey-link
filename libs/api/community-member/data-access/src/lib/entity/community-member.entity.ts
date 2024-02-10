import { Field, HideField, ObjectType } from '@nestjs/graphql'
import { User } from '@pubkey-link/api-user-data-access'
import { CommunityMemberRole } from './community-member-role.entity'
import { CommunityRole } from './community-role.enum'

@ObjectType()
export class CommunityMember {
  @Field()
  id!: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field(() => CommunityRole)
  role!: CommunityRole
  @Field(() => User, { nullable: true })
  user?: User
  @HideField()
  roles?: CommunityMemberRole[]
  @Field()
  userId!: string
  @Field()
  communityId!: string
}
