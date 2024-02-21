import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkey-link/api-core-data-access'
import { ApiRoleDataAccessModule } from '@pubkey-link/api-role-data-access'
import { ApiAdminSnapshotService } from './api-admin-snapshot.service'
import { ApiSnapshotRoleService } from './api-snapshot-role.service'
import { ApiSnapshotService } from './api-snapshot.service'
import { ApiUserSnapshotService } from './api-user-snapshot.service'

@Module({
  imports: [ApiCoreDataAccessModule, ApiRoleDataAccessModule],
  providers: [ApiSnapshotService, ApiUserSnapshotService, ApiSnapshotRoleService, ApiAdminSnapshotService],
  exports: [ApiSnapshotService],
})
export class ApiSnapshotDataAccessModule {}
