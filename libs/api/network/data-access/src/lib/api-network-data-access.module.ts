import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkey-link/api-core-data-access'
import { ApiNetworkService } from './api-network.service'
import { ApiAdminNetworkService } from './api-admin-network.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiNetworkService, ApiAdminNetworkService],
  exports: [ApiNetworkService],
})
export class ApiNetworkDataAccessModule {}
