import { Field, ObjectType } from '@nestjs/graphql'
import { CommunityRole } from './community-role.enum'
import { User } from '@pubkey-link/api-user-data-access'

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
  @Field()
  userId!: string
  @Field()
  communityId!: string
}
