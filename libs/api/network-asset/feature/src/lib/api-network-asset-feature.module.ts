import { Module } from '@nestjs/common'
import { ApiNetworkAssetDataAccessModule } from '@pubkey-link/api-network-asset-data-access'
import { ApiNetworkAssetResolver } from './api-network-asset.resolver'
import { ApiUserNetworkAssetResolver } from './api-user-network-asset.resolver'
import { ApiAdminNetworkAssetResolver } from './api-admin-network-asset.resolver'

@Module({
  imports: [ApiNetworkAssetDataAccessModule],
  providers: [ApiNetworkAssetResolver, ApiUserNetworkAssetResolver, ApiAdminNetworkAssetResolver],
})
export class ApiNetworkAssetFeatureModule {}
