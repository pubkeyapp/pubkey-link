import { Module } from '@nestjs/common'
import { ApiAllocationDataAccessModule } from '@pubkey-link/api-allocation-data-access'
import { ApiAllocationResolver } from './api-allocation.resolver'
import { ApiAllocationAdminResolver } from './api-allocation-admin.resolver'

@Module({
  imports: [ApiAllocationDataAccessModule],
  providers: [ApiAllocationResolver, ApiAllocationAdminResolver],
})
export class ApiAllocationFeatureModule {}
