import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkey-link/api-core-data-access'
import { ApiLogDataAdminService } from './api-log-data-admin.service'
import { ApiLogDataUserService } from './api-log-data-user.service'
import { ApiLogDataService } from './api-log-data.service'
import { ApiLogService } from './api-log.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiLogService, ApiLogDataService, ApiLogDataUserService, ApiLogDataAdminService],
  exports: [ApiLogService],
})
export class ApiLogDataAccessModule {}
