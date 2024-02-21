import { Module } from '@nestjs/common'
import { ApiSnapshotDataAccessModule } from '@pubkey-link/api-snapshot-data-access'
import { ApiSnapshotResolver } from './api-snapshot.resolver'
import { ApiUserSnapshotResolver } from './api-user-snapshot.resolver'
import { ApiAdminSnapshotResolver } from './api-admin-snapshot.resolver'

@Module({
  imports: [ApiSnapshotDataAccessModule],
  providers: [ApiSnapshotResolver, ApiUserSnapshotResolver, ApiAdminSnapshotResolver],
})
export class ApiSnapshotFeatureModule {}
