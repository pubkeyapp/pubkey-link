import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { ApiNetworkAssetService, NetworkAsset } from '@pubkey-link/api-network-asset-data-access'
import { getNetworkExplorerUrl } from '@pubkey-link/api-network-util'
import { Log } from '@pubkey-link/api-log-data-access'

@Resolver(() => NetworkAsset)
export class ApiNetworkAssetResolver {
  constructor(private readonly service: ApiNetworkAssetService) {}

  @ResolveField(() => String)
  explorerUrl(@Parent() networkAsset: NetworkAsset) {
    return getNetworkExplorerUrl(networkAsset.cluster).replace('{path}', `address/${networkAsset.account}`)
  }

  @ResolveField(() => [Log], { nullable: true })
  logs(@Parent() networkAsset: NetworkAsset) {
    return networkAsset.logs ?? []
  }
}
