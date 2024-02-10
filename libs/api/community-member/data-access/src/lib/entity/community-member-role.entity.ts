import { Field, ObjectType } from '@nestjs/graphql'
import { Role } from '@pubkey-link/api-role-data-access'
import { CommunityMember } from './community-member.entity'

@ObjectType()
export class CommunityMemberRole {
  @Field()
  id!: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field()
  memberId!: string
  @Field({ nullable: true })
  member?: CommunityMember
  @Field()
  roleId!: string
  @Field({ nullable: true })
  role?: Role
}
