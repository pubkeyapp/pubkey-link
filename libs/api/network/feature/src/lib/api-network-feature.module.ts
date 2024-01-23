import { Module } from '@nestjs/common'
import { ApiNetworkDataAccessModule } from '@pubkey-link/api-network-data-access'
import { ApiNetworkResolver } from './api-network.resolver'
import { ApiAdminNetworkResolver } from './api-admin-network.resolver'

@Module({
  imports: [ApiNetworkDataAccessModule],
  providers: [ApiNetworkResolver, ApiAdminNetworkResolver],
})
export class ApiNetworkFeatureModule {}
