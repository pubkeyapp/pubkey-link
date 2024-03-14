import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkey-link/api-core-data-access'
import { ApiRoleDataAccessModule } from '@pubkey-link/api-role-data-access'
import { ApiSnapshotDataAdminService } from './api-snapshot-data-admin.service'
import { ApiSnapshotDataUserService } from './api-snapshot-data-user.service'
import { ApiSnapshotDataService } from './api-snapshot-data.service'
import { ApiSnapshotService } from './api-snapshot.service'

@Module({
  imports: [ApiCoreDataAccessModule, ApiRoleDataAccessModule],
  providers: [ApiSnapshotService, ApiSnapshotDataUserService, ApiSnapshotDataService, ApiSnapshotDataAdminService],
  exports: [ApiSnapshotService],
})
export class ApiSnapshotDataAccessModule {}
