import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { User } from '@prisma/client'
import { ApiAuthGraphQLUserGuard, CtxUser } from '@pubkey-link/api-auth-data-access'
import {
  ApiNetworkTokenService,
  NetworkTokenPaging,
  UserFindManyNetworkTokenInput,
} from '@pubkey-link/api-network-token-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiUserNetworkTokenResolver {
  constructor(private readonly service: ApiNetworkTokenService) {}

  @Query(() => NetworkTokenPaging)
  userFindManyNetworkToken(@CtxUser() actor: User, @Args('input') input: UserFindManyNetworkTokenInput) {
    return this.service.user.findManyNetworkToken(actor, input)
  }
}
