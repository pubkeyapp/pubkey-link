import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import {
  ApiCommunityService,
  Community,
  CommunityPaging,
  UserCreateCommunityInput,
  UserFindManyCommunityInput,
  UserUpdateCommunityInput,
} from '@pubkey-link/api-community-data-access'
import { ApiAuthGraphQLUserGuard, CtxUserId } from '@pubkey-link/api-auth-data-access'
import { UseGuards } from '@nestjs/common'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiUserCommunityResolver {
  constructor(private readonly service: ApiCommunityService) {}

  @Mutation(() => Community, { nullable: true })
  userCreateCommunity(@CtxUserId() userId: string, @Args('input') input: UserCreateCommunityInput) {
    return this.service.user.createCommunity(userId, input)
  }

  @Mutation(() => Boolean, { nullable: true })
  userDeleteCommunity(@Args('communityId') communityId: string) {
    return this.service.user.deleteCommunity(communityId)
  }

  @Query(() => CommunityPaging)
  userFindManyCommunity(@Args('input') input: UserFindManyCommunityInput) {
    return this.service.user.findManyCommunity(input)
  }

  @Query(() => Community, { nullable: true })
  userFindOneCommunity(@Args('communityId') communityId: string) {
    return this.service.user.findOneCommunity(communityId)
  }

  @Mutation(() => Community, { nullable: true })
  userUpdateCommunity(@Args('communityId') communityId: string, @Args('input') input: UserUpdateCommunityInput) {
    return this.service.user.updateCommunity(communityId, input)
  }
}
