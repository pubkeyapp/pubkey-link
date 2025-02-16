import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkey-link/api-core-data-access'
import { ApiAllocationService } from './api-allocation.service'
import { ApiAllocationDataService } from './api-allocation-data.service'
import { ApiAllocationDataAdminService } from './api-allocation-data-admin.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiAllocationService, ApiAllocationDataService, ApiAllocationDataAdminService],
  exports: [ApiAllocationService],
})
export class ApiAllocationDataAccessModule {}
