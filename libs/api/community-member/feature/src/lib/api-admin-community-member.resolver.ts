import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLAdminGuard } from '@pubkey-link/api-auth-data-access'
import {
  AdminFindManyCommunityMemberInput,
  AdminUpdateCommunityMemberInput,
  ApiCommunityMemberService,
  CommunityMember,
  CommunityMemberPaging,
} from '@pubkey-link/api-community-member-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLAdminGuard)
export class ApiAdminCommunityMemberResolver {
  constructor(private readonly service: ApiCommunityMemberService) {}

  @Mutation(() => Boolean, { nullable: true })
  adminDeleteCommunityMember(@Args('communityMemberId') communityMemberId: string) {
    return this.service.admin.deleteCommunityMember(communityMemberId)
  }

  @Query(() => CommunityMemberPaging)
  adminFindManyCommunityMember(@Args('input') input: AdminFindManyCommunityMemberInput) {
    return this.service.admin.findManyCommunityMember(input)
  }

  @Query(() => CommunityMember, { nullable: true })
  adminFindOneCommunityMember(@Args('communityMemberId') communityMemberId: string) {
    return this.service.admin.findOneCommunityMember(communityMemberId)
  }

  @Mutation(() => CommunityMember, { nullable: true })
  adminUpdateCommunityMember(
    @Args('communityMemberId') communityMemberId: string,
    @Args('input') input: AdminUpdateCommunityMemberInput,
  ) {
    return this.service.admin.updateCommunityMember(communityMemberId, input)
  }
}
