import { UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLUserGuard, CtxUserId } from '@pubkey-link/api-auth-data-access'
import { BaseContext } from '@pubkey-link/api-core-data-access'
import {
  ApiIdentityService,
  Identity,
  IdentityChallenge,
  LinkIdentityInput,
  RequestIdentityChallengeInput,
  UserFindManyIdentityInput,
  VerifyIdentityChallengeInput,
} from '@pubkey-link/api-identity-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiUserIdentityResolver {
  constructor(private readonly service: ApiIdentityService) {}

  @Mutation(() => Boolean, { nullable: true })
  userDeleteIdentity(@CtxUserId() userId: string, @Args('identityId') identityId: string) {
    return this.service.user.deleteIdentity(userId, identityId)
  }

  @Query(() => IdentityChallenge, { nullable: true })
  userRequestIdentityChallenge(
    @Context() ctx: BaseContext,
    @CtxUserId() userId: string,
    @Args('input') input: RequestIdentityChallengeInput,
  ) {
    return this.service.user.requestIdentityChallenge(ctx, userId, input)
  }

  @Mutation(() => Identity, { nullable: true })
  userLinkIdentity(@CtxUserId() userId: string, @Args('input') input: LinkIdentityInput) {
    return this.service.user.linkIdentity(userId, input)
  }

  @Mutation(() => IdentityChallenge, { nullable: true })
  userVerifyIdentityChallenge(
    @Context() ctx: BaseContext,
    @CtxUserId() userId: string,
    @Args('input') input: VerifyIdentityChallengeInput,
  ) {
    return this.service.user.verifyIdentityChallenge(ctx, userId, input)
  }

  @Query(() => [Identity], { nullable: true })
  userFindManyIdentity(@Args('input') input: UserFindManyIdentityInput) {
    return this.service.user.findManyIdentity(input)
  }
}
