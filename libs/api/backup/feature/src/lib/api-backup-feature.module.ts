import { Module } from '@nestjs/common'
import { ApiBackupDataAccessModule } from '@pubkey-link/api-backup-data-access'
import { ApiAdminBackupResolver } from './api-admin-backup.resolver'
import { ApiBackupController } from './api-backup.controller'

@Module({
  controllers: [ApiBackupController],
  imports: [ApiBackupDataAccessModule],
  providers: [ApiAdminBackupResolver],
})
export class ApiBackupFeatureModule {}
