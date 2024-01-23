import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import {
  AdminCreateCommunityInput,
  AdminFindManyCommunityInput,
  AdminUpdateCommunityInput,
  ApiCommunityService,
  Community,
  CommunityPaging,
} from '@pubkey-link/api-community-data-access'
import { ApiAuthGraphQLAdminGuard } from '@pubkey-link/api-auth-data-access'
import { UseGuards } from '@nestjs/common'
import { CtxUserId } from '@pubkey-link/api-auth-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLAdminGuard)
export class ApiAdminCommunityResolver {
  constructor(private readonly service: ApiCommunityService) {}

  @Mutation(() => Community, { nullable: true })
  adminCreateCommunity(@CtxUserId() userId: string, @Args('input') input: AdminCreateCommunityInput) {
    return this.service.admin.createCommunity(userId, input)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminDeleteCommunity(@Args('communityId') communityId: string) {
    return this.service.admin.deleteCommunity(communityId)
  }

  @Query(() => CommunityPaging)
  adminFindManyCommunity(@Args('input') input: AdminFindManyCommunityInput) {
    return this.service.admin.findManyCommunity(input)
  }

  @Query(() => Community, { nullable: true })
  adminFindOneCommunity(@Args('communityId') communityId: string) {
    return this.service.admin.findOneCommunity(communityId)
  }

  @Mutation(() => Community, { nullable: true })
  adminUpdateCommunity(@Args('communityId') communityId: string, @Args('input') input: AdminUpdateCommunityInput) {
    return this.service.admin.updateCommunity(communityId, input)
  }
}
