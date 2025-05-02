import { Module } from '@nestjs/common'
import { ApiScheduleDataAccessModule } from '@pubkey-link/api-schedule-data-access'
import { ApiScheduleResolver } from './api-schedule.resolver'

@Module({
  imports: [ApiScheduleDataAccessModule],
  providers: [ApiScheduleResolver],
})
export class ApiScheduleFeatureModule {}
