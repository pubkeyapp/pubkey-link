import { Int, Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { ApiNetworkService, Network } from '@pubkey-link/api-network-data-access'
import { getNetworkDecimals, getNetworkExplorerUrl, getNetworkSymbol } from '@pubkey-link/api-network-util'

@Resolver(() => Network)
export class ApiNetworkResolver {
  constructor(private readonly service: ApiNetworkService) {}

  @ResolveField(() => Int)
  decimals(@Parent() network: Network) {
    return getNetworkDecimals(network.type)
  }

  @ResolveField(() => String)
  explorerUrl(@Parent() network: Network) {
    return getNetworkExplorerUrl(network.cluster, network.endpoint)
  }

  @ResolveField(() => String)
  symbol(@Parent() network: Network) {
    return getNetworkSymbol(network.type)
  }
}
