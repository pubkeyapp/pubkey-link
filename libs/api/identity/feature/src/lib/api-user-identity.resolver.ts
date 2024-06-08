import { UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLUserGuard, CtxUser, CtxUserId } from '@pubkey-link/api-auth-data-access'
import { BaseContext, IdentityProvider } from '@pubkey-link/api-core-data-access'
import {
  ApiIdentityService,
  Identity,
  IdentityChallenge,
  LinkIdentityInput,
  RequestIdentityChallengeInput,
  UserAddIdentityGrantInput,
  UserFindManyIdentityInput,
  UserRemoveIdentityGrantInput,
  UserUpdateIdentityInput,
  VerifyIdentityChallengeInput,
} from '@pubkey-link/api-identity-data-access'
import { User } from '@pubkey-link/api-user-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiUserIdentityResolver {
  constructor(private readonly service: ApiIdentityService) {}

  @Mutation(() => Boolean, { nullable: true })
  userDeleteIdentity(@CtxUserId() userId: string, @Args('identityId') identityId: string) {
    return this.service.user.deleteIdentity(userId, identityId)
  }

  @Mutation(() => Boolean, { nullable: true })
  userRefreshIdentity(@CtxUserId() userId: string, @Args('identityId') identityId: string) {
    return this.service.user.refreshIdentity(userId, identityId)
  }

  @Query(() => IdentityChallenge, { nullable: true })
  userRequestIdentityChallenge(
    @Context() ctx: BaseContext,
    @CtxUserId() userId: string,
    @Args('input') input: RequestIdentityChallengeInput,
  ) {
    return this.service.user.requestIdentityChallenge(ctx, userId, input)
  }

  @Query(() => IdentityChallenge, { nullable: true })
  userRequestIdentityChallengeCli(@CtxUserId() userId: string, @Args('input') input: RequestIdentityChallengeInput) {
    return this.service.user.requestIdentityChallengeCli(userId, input)
  }

  @Mutation(() => Identity, { nullable: true })
  userLinkIdentity(@CtxUserId() userId: string, @Args('input') input: LinkIdentityInput) {
    return this.service.user.linkIdentity(userId, input)
  }

  @Mutation(() => Identity, { nullable: true })
  userUpdateIdentity(
    @CtxUserId() userId: string,
    @Args('identityId') identityId: string,
    @Args('input') input: UserUpdateIdentityInput,
  ) {
    return this.service.user.updateIdentity(userId, identityId, input)
  }

  @Mutation(() => IdentityChallenge, { nullable: true })
  userVerifyIdentityChallenge(
    @Context() ctx: BaseContext,
    @CtxUserId() userId: string,
    @Args('input') input: VerifyIdentityChallengeInput,
  ) {
    return this.service.user.verifyIdentityChallenge(ctx, userId, input)
  }

  @Mutation(() => IdentityChallenge, { nullable: true })
  userVerifyIdentityChallengeCli(@CtxUserId() userId: string, @Args('input') input: VerifyIdentityChallengeInput) {
    return this.service.user.verifyIdentityChallengeCli(userId, input)
  }

  @Query(() => [Identity], { nullable: true })
  userFindManyIdentity(@CtxUser() actor: User, @Args('input') input: UserFindManyIdentityInput) {
    return this.service.user.findManyIdentity(actor, input)
  }

  @Query(() => Identity, { nullable: true })
  userFindOneIdentity(
    @Args({ name: 'provider', type: () => IdentityProvider }) provider: IdentityProvider,
    @Args('providerId') providerId: string,
  ) {
    return this.service.user.findOneIdentity(provider, providerId)
  }

  @Mutation(() => Boolean, { nullable: true })
  userAddIdentityGrant(@CtxUserId() userId: string, @Args('input') input: UserAddIdentityGrantInput) {
    return this.service.user.addIdentityGrant(userId, input)
  }

  @Mutation(() => Boolean, { nullable: true })
  userRemoveIdentityGrant(@CtxUserId() userId: string, @Args('input') input: UserRemoveIdentityGrantInput) {
    return this.service.user.removeIdentityGrant(userId, input)
  }
}
