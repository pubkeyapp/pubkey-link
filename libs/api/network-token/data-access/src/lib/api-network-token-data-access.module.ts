import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkey-link/api-core-data-access'
import { ApiNetworkDataAccessModule } from '@pubkey-link/api-network-data-access'
import { ApiNetworkTokenService } from './api-network-token.service'
import { ApiAdminNetworkTokenService } from './api-admin-network-token.service'
import { ApiUserNetworkTokenService } from './api-user-network-token.service'

@Module({
  imports: [ApiCoreDataAccessModule, ApiNetworkDataAccessModule],
  providers: [ApiNetworkTokenService, ApiAdminNetworkTokenService, ApiUserNetworkTokenService],
  exports: [ApiNetworkTokenService],
})
export class ApiNetworkTokenDataAccessModule {}
