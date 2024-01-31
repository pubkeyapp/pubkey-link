import { Field, ObjectType } from '@nestjs/graphql'
import { Rule } from '@pubkey-link/api-rule-data-access'
import { CommunityMember } from './community-member.entity'

@ObjectType()
export class CommunityMemberRule {
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
  ruleId!: string
  @Field({ nullable: true })
  rule?: Rule
}
