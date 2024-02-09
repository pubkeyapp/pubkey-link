import { Module } from '@nestjs/common'
import { ApiAuthDataAccessModule } from '@pubkey-link/api-auth-data-access'
import { ApiCoreDataAccessModule } from '@pubkey-link/api-core-data-access'
import { ApiNetworkAssetDataAccessModule } from '@pubkey-link/api-network-asset-data-access'
import { ApiAdminIdentityService } from './api-admin-identity.service'
import { ApiAnonIdentityService } from './api-anon-identity.service'
import { ApiIdentityService } from './api-identity.service'
import { ApiSolanaIdentityService } from './api-solana-identity.service'
import { ApiUserIdentityService } from './api-user-identity.service'

@Module({
  imports: [ApiAuthDataAccessModule, ApiCoreDataAccessModule, ApiNetworkAssetDataAccessModule],
  providers: [
    ApiAdminIdentityService,
    ApiAnonIdentityService,
    ApiIdentityService,
    ApiSolanaIdentityService,
    ApiUserIdentityService,
  ],
  exports: [ApiIdentityService],
})
export class ApiIdentityDataAccessModule {}
