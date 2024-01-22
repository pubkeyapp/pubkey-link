import { Resolver } from '@nestjs/graphql'
import { ApiCommunityService } from '@pubkey-link/api-community-data-access'
import { ApiAuthGraphQLAdminGuard } from '@pubkey-link/api-auth-data-access'
import { Mutation, Query, Args } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateCommunityInput,
  AdminFindManyCommunityInput,
  Community,
  CommunityPaging,
  AdminUpdateCommunityInput,
} from '@pubkey-link/api-community-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLAdminGuard)
export class ApiAdminCommunityResolver {
  constructor(private readonly service: ApiCommunityService) {}

  @Mutation(() => Community, { nullable: true })
  adminCreateCommunity(@Args('input') input: AdminCreateCommunityInput) {
    return this.service.admin.createCommunity(input)
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
