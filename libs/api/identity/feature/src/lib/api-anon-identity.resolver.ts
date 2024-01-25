import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { BaseContext, IdentityProvider } from '@pubkey-link/api-core-data-access'
import {
  ApiIdentityService,
  IdentityChallenge,
  RequestIdentityChallengeInput,
  VerifyIdentityChallengeInput,
} from '@pubkey-link/api-identity-data-access'
import { User } from '@pubkey-link/api-user-data-access'

@Resolver()
export class ApiAnonIdentityResolver {
  constructor(private readonly service: ApiIdentityService) {}

  @Query(() => User, { nullable: true })
  anonFindUserByIdentity(
    @Args({ name: 'provider', type: () => IdentityProvider }) provider: IdentityProvider,
    @Args('providerId') providerId: string,
  ) {
    return this.service.anon.findUserByIdentity(provider, providerId)
  }

  @Query(() => IdentityChallenge, { nullable: true })
  anonRequestIdentityChallenge(@Context() ctx: BaseContext, @Args('input') input: RequestIdentityChallengeInput) {
    return this.service.anon.requestIdentityChallenge(ctx, input)
  }

  @Mutation(() => IdentityChallenge, { nullable: true })
  anonVerifyIdentityChallenge(@Context() ctx: BaseContext, @Args('input') input: VerifyIdentityChallengeInput) {
    return this.service.anon.verifyIdentityChallenge(ctx, input)
  }
}
