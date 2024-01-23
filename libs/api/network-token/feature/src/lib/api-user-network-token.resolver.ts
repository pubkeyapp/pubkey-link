import { Args, Query, Resolver } from '@nestjs/graphql'
import {
  ApiNetworkTokenService,
  NetworkTokenPaging,
  UserFindManyNetworkTokenInput,
} from '@pubkey-link/api-network-token-data-access'
import { ApiAuthGraphQLUserGuard } from '@pubkey-link/api-auth-data-access'
import { UseGuards } from '@nestjs/common'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiUserNetworkTokenResolver {
  constructor(private readonly service: ApiNetworkTokenService) {}

  @Query(() => NetworkTokenPaging)
  userFindManyNetworkToken(@Args('input') input: UserFindManyNetworkTokenInput) {
    return this.service.user.findManyNetworkToken(input)
  }
}
