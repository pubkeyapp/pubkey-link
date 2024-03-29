import { Module } from '@nestjs/common'
import { ApiNetworkTokenDataAccessModule } from '@pubkey-link/api-network-token-data-access'
import { ApiNetworkTokenResolver } from './api-network-token.resolver'
import { ApiAdminNetworkTokenResolver } from './api-admin-network-token.resolver'
import { ApiUserNetworkTokenResolver } from './api-user-network-token.resolver'

@Module({
  imports: [ApiNetworkTokenDataAccessModule],
  providers: [ApiNetworkTokenResolver, ApiAdminNetworkTokenResolver, ApiUserNetworkTokenResolver],
})
export class ApiNetworkTokenFeatureModule {}
