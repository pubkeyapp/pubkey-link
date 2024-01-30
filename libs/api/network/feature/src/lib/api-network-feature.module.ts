import { Module } from '@nestjs/common'
import { ApiNetworkDataAccessModule } from '@pubkey-link/api-network-data-access'
import { ApiAdminNetworkResolver } from './api-admin-network.resolver'
import { ApiNetworkResolver } from './api-network.resolver'
import { ApiUserNetworkResolver } from './api-user-network.resolver'

@Module({
  imports: [ApiNetworkDataAccessModule],
  providers: [ApiNetworkResolver, ApiAdminNetworkResolver, ApiUserNetworkResolver],
})
export class ApiNetworkFeatureModule {}
