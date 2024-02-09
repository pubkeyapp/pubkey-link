import { Resolver } from '@nestjs/graphql'
import { ApiNetworkAssetService } from '@pubkey-link/api-network-asset-data-access'
import { NetworkAsset } from '@pubkey-link/api-network-asset-data-access'

@Resolver(() => NetworkAsset)
export class ApiNetworkAssetResolver {
  constructor(private readonly service: ApiNetworkAssetService) {}
}
