import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkey-link/api-core-data-access'
import { ApiBackupService } from './api-backup.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiBackupService],
  exports: [ApiBackupService],
})
export class ApiBackupDataAccessModule {}
