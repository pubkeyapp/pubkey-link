import { UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLUserGuard, CtxUser } from '@pubkey-link/api-auth-data-access'
import { BaseContext } from '@pubkey-link/api-core-data-access'
import {
  ApiIdentityService,
  Identity,
  IdentityChallenge,
  LinkIdentityInput,
  RequestIdentityChallengeInput,
  VerifyIdentityChallengeInput,
} from '@pubkey-link/api-identity-data-access'
import { User } from '@pubkey-link/api-user-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiUserIdentityResolver {
  constructor(private readonly service: ApiIdentityService) {}

  @Mutation(() => Boolean, { nullable: true })
  userDeleteIdentity(@CtxUser() user: User, @Args('identityId') identityId: string) {
    return this.service.user.deleteIdentity(user.id, identityId)
  }

  @Query(() => IdentityChallenge, { nullable: true })
  userRequestIdentityChallenge(
    @Context() ctx: BaseContext,
    @CtxUser() user: User,
    @Args('input') input: RequestIdentityChallengeInput,
  ) {
    return this.service.user.requestIdentityChallenge(ctx, user.id, input)
  }

  @Mutation(() => Identity, { nullable: true })
  userLinkIdentity(@CtxUser() user: User, @Args('input') input: LinkIdentityInput) {
    return this.service.user.linkIdentity(user.id, input)
  }

  @Mutation(() => IdentityChallenge, { nullable: true })
  userVerifyIdentityChallenge(
    @Context() ctx: BaseContext,
    @CtxUser() user: User,
    @Args('input') input: VerifyIdentityChallengeInput,
  ) {
    return this.service.user.verifyIdentityChallenge(ctx, user.id, input)
  }

  @Query(() => [Identity], { nullable: true })
  userFindManyIdentity(@CtxUser() user: User) {
    return this.service.user.findManyIdentity(user.id)
  }
}
