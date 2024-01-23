import { Resolver } from '@nestjs/graphql'
import { ApiCommunityMemberService } from '@pubkey-link/api-community-member-data-access'
import { ApiAuthGraphQLUserGuard } from '@pubkey-link/api-auth-data-access'
import { Mutation, Query, Args } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateCommunityMemberInput,
  UserFindManyCommunityMemberInput,
  CommunityMember,
  CommunityMemberPaging,
  UserUpdateCommunityMemberInput,
} from '@pubkey-link/api-community-member-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiUserCommunityMemberResolver {
  constructor(private readonly service: ApiCommunityMemberService) {}

  @Mutation(() => CommunityMember, { nullable: true })
  userCreateCommunityMember(@Args('input') input: UserCreateCommunityMemberInput) {
    return this.service.user.createCommunityMember(input)
  }

  @Mutation(() => Boolean, { nullable: true })
  userDeleteCommunityMember(@Args('communityMemberId') communityMemberId: string) {
    return this.service.user.deleteCommunityMember(communityMemberId)
  }

  @Query(() => CommunityMemberPaging)
  userFindManyCommunityMember(@Args('input') input: UserFindManyCommunityMemberInput) {
    return this.service.user.findManyCommunityMember(input)
  }

  @Query(() => CommunityMember, { nullable: true })
  userFindOneCommunityMember(@Args('communityMemberId') communityMemberId: string) {
    return this.service.user.findOneCommunityMember(communityMemberId)
  }

  @Mutation(() => CommunityMember, { nullable: true })
  userUpdateCommunityMember(
    @Args('communityMemberId') communityMemberId: string,
    @Args('input') input: UserUpdateCommunityMemberInput,
  ) {
    return this.service.user.updateCommunityMember(communityMemberId, input)
  }
}
