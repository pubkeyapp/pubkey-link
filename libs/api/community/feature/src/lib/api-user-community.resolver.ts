import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLUserGuard, CtxUserId } from '@pubkey-link/api-auth-data-access'
import {
  ApiCommunityService,
  Community,
  CommunityPaging,
  UserCreateCommunityInput,
  UserFindManyCommunityInput,
  UserUpdateCommunityInput,
} from '@pubkey-link/api-community-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiUserCommunityResolver {
  constructor(private readonly service: ApiCommunityService) {}

  @Mutation(() => Community, { nullable: true })
  userCreateCommunity(@CtxUserId() userId: string, @Args('input') input: UserCreateCommunityInput) {
    return this.service.user.createCommunity(userId, input)
  }

  @Mutation(() => Boolean, { nullable: true })
  userDeleteCommunity(@CtxUserId() userId: string, @Args('communityId') communityId: string) {
    return this.service.user.deleteCommunity(userId, communityId)
  }

  @Query(() => CommunityPaging)
  userFindManyCommunity(@CtxUserId() userId: string, @Args('input') input: UserFindManyCommunityInput) {
    return this.service.user.findManyCommunity(userId, input)
  }

  @Query(() => Community, { nullable: true })
  userFindOneCommunity(@CtxUserId() userId: string, @Args('communityId') communityId: string) {
    return this.service.user.findOneCommunity(userId, communityId)
  }

  @Mutation(() => Community, { nullable: true })
  userUpdateCommunity(
    @CtxUserId() userId: string,
    @Args('communityId') communityId: string,
    @Args('input') input: UserUpdateCommunityInput,
  ) {
    return this.service.user.updateCommunity(userId, communityId, input)
  }
}
