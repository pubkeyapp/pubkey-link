import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLUserGuard, CtxUserId } from '@pubkey-link/api-auth-data-access'
import {
  ApiCommunityMemberService,
  CommunityMember,
  CommunityMemberPaging,
  CommunityRole,
  UserAddCommunityMemberInput,
  UserFindManyCommunityMemberInput,
  UserUpdateCommunityMemberInput,
} from '@pubkey-link/api-community-member-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiUserCommunityMemberResolver {
  constructor(private readonly service: ApiCommunityMemberService) {}

  @Mutation(() => CommunityMember, { nullable: true })
  userAddCommunityMember(
    @CtxUserId() userId: string,
    @Args('communityId') communityId: string,
    @Args('input') input: UserAddCommunityMemberInput,
  ) {
    return this.service.user.addCommunityMember(userId, communityId, input)
  }

  @Mutation(() => Boolean, { nullable: true })
  userRemoveCommunityMember(@CtxUserId() userId: string, @Args('communityMemberId') communityMemberId: string) {
    return this.service.user.removeCommunityMember(userId, communityMemberId)
  }

  @Query(() => CommunityRole, { nullable: true })
  userGetCommunityRole(@CtxUserId() userId: string, @Args('communityId') communityId: string) {
    return this.service.user.getCommunityRole({ communityId, userId })
  }

  @Query(() => CommunityMemberPaging)
  userFindManyCommunityMember(@CtxUserId() userId: string, @Args('input') input: UserFindManyCommunityMemberInput) {
    return this.service.user.findManyCommunityMember(userId, input)
  }

  @Query(() => CommunityMember, { nullable: true })
  userFindOneCommunityMember(@CtxUserId() userId: string, @Args('communityMemberId') communityMemberId: string) {
    return this.service.user.findOneCommunityMember(userId, communityMemberId)
  }

  @Mutation(() => CommunityMember, { nullable: true })
  userUpdateCommunityMember(
    @CtxUserId() userId: string,
    @Args('communityMemberId') communityMemberId: string,
    @Args('input') input: UserUpdateCommunityMemberInput,
  ) {
    return this.service.user.updateCommunityMember(userId, communityMemberId, input)
  }
}
