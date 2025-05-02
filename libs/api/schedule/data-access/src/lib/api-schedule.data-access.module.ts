import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkey-link/api-core-data-access'
import { ApiScheduleService } from './api-schedule.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiScheduleService],
  exports: [ApiScheduleService],
})
export class ApiScheduleDataAccessModule {}
