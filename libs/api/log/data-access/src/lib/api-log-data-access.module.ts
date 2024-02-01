import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkey-link/api-core-data-access'
import { ApiLogService } from './api-log.service'
import { ApiUserLogService } from './api-user-log.service'
import { ApiAdminLogService } from './api-admin-log.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiLogService, ApiUserLogService, ApiAdminLogService],
  exports: [ApiLogService],
})
export class ApiLogDataAccessModule {}
