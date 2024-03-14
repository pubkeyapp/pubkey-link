import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkey-link/api-core-data-access'
import { ApiNetworkDataAccessModule } from '@pubkey-link/api-network-data-access'
import { ApiNetworkTokenDataAdminService } from './api-network-token-data-admin.service'
import { ApiNetworkTokenDataUserService } from './api-network-token-data-user.service'
import { ApiNetworkTokenDataService } from './api-network-token-data.service'
import { ApiNetworkTokenService } from './api-network-token.service'

@Module({
  imports: [ApiCoreDataAccessModule, ApiNetworkDataAccessModule],
  providers: [
    ApiNetworkTokenService,
    ApiNetworkTokenDataService,
    ApiNetworkTokenDataAdminService,
    ApiNetworkTokenDataUserService,
  ],
  exports: [ApiNetworkTokenService],
})
export class ApiNetworkTokenDataAccessModule {}
