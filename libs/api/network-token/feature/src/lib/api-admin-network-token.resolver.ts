import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLAdminGuard } from '@pubkey-link/api-auth-data-access'
import {
  AdminCreateNetworkTokenInput,
  AdminFindManyNetworkTokenInput,
  AdminUpdateNetworkTokenInput,
  ApiNetworkTokenService,
  NetworkToken,
  NetworkTokenPaging,
} from '@pubkey-link/api-network-token-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLAdminGuard)
export class ApiAdminNetworkTokenResolver {
  constructor(private readonly service: ApiNetworkTokenService) {}

  @Mutation(() => NetworkToken, { nullable: true })
  adminCreateNetworkToken(@Args('input') input: AdminCreateNetworkTokenInput) {
    return this.service.admin.createNetworkToken(input)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminDeleteNetworkToken(@Args('networkTokenId') networkTokenId: string) {
    return this.service.admin.deleteNetworkToken(networkTokenId)
  }

  @Query(() => NetworkTokenPaging)
  adminFindManyNetworkToken(@Args('input') input: AdminFindManyNetworkTokenInput) {
    return this.service.admin.findManyNetworkToken(input)
  }

  @Query(() => NetworkToken, { nullable: true })
  adminFindOneNetworkToken(@Args('networkTokenId') networkTokenId: string) {
    return this.service.admin.findOneNetworkToken(networkTokenId)
  }

  @Mutation(() => NetworkToken, { nullable: true })
  adminUpdateNetworkToken(
    @Args('networkTokenId') networkTokenId: string,
    @Args('input') input: AdminUpdateNetworkTokenInput,
  ) {
    return this.service.admin.updateNetworkToken(networkTokenId, input)
  }

  @Mutation(() => NetworkToken, { nullable: true })
  adminUpdateNetworkTokenMetadata(@Args('networkTokenId') networkTokenId: string) {
    return this.service.admin.updateNetworkTokenMetadata(networkTokenId)
  }
}
