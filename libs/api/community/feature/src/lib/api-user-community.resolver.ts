import { Resolver } from '@nestjs/graphql'
import { ApiCommunityService } from '@pubkey-link/api-community-data-access'
import { ApiAuthGraphQLUserGuard } from '@pubkey-link/api-auth-data-access'
import { Mutation, Query, Args } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateCommunityInput,
  UserFindManyCommunityInput,
  Community,
  CommunityPaging,
  UserUpdateCommunityInput,
} from '@pubkey-link/api-community-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiUserCommunityResolver {
  constructor(private readonly service: ApiCommunityService) {}

  @Mutation(() => Community, { nullable: true })
  userCreateCommunity(@Args('input') input: UserCreateCommunityInput) {
    return this.service.user.createCommunity(input)
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
