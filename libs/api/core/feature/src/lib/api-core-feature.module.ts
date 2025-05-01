import { Module } from '@nestjs/common'
import { ApiAuthFeatureModule } from '@pubkey-link/api-auth-feature'
import { ApiBackupFeatureModule } from '@pubkey-link/api-backup-feature'
import { ApiBotFeatureModule } from '@pubkey-link/api-bot-feature'
import { ApiCommunityFeatureModule } from '@pubkey-link/api-community-feature'
import { ApiCommunityMemberFeatureModule } from '@pubkey-link/api-community-member-feature'
import { ApiCoreDataAccessModule } from '@pubkey-link/api-core-data-access'
import { ApiIdentityFeatureModule } from '@pubkey-link/api-identity-feature'
import { ApiLogFeatureModule } from '@pubkey-link/api-log-feature'
import { ApiNetworkAssetFeatureModule } from '@pubkey-link/api-network-asset-feature'
import { ApiNetworkFeatureModule } from '@pubkey-link/api-network-feature'
import { ApiNetworkTokenFeatureModule } from '@pubkey-link/api-network-token-feature'
import { ApiRoleFeatureModule } from '@pubkey-link/api-role-feature'
import { ApiScheduleFeatureModule } from '@pubkey-link/api-schedule-feature'
import { ApiSnapshotFeatureModule } from '@pubkey-link/api-snapshot-feature'
import { ApiUserFeatureModule } from '@pubkey-link/api-user-feature'
import { ApiCoreProtocolController } from './api-core-protocol.controller'
import { ApiCoreController } from './api-core.controller'
import { ApiCoreResolver } from './api-core.resolver'
import { ApiCacheFeatureModule } from '@pubkey-link/api-cache-feature'

const imports = [
  // The api-feature generator will add the imports here
  ApiAuthFeatureModule,
  ApiBackupFeatureModule,
  ApiBotFeatureModule,
  ApiCommunityFeatureModule,
  ApiCommunityMemberFeatureModule,
  ApiCoreDataAccessModule,
  ApiIdentityFeatureModule,
  ApiLogFeatureModule,
  ApiNetworkAssetFeatureModule,
  ApiNetworkFeatureModule,
  ApiNetworkTokenFeatureModule,
  ApiRoleFeatureModule,
  ApiScheduleFeatureModule,
  ApiSnapshotFeatureModule,
  ApiUserFeatureModule,
  ApiCacheFeatureModule,
]

@Module({
  controllers: [ApiCoreController, ApiCoreProtocolController],
  imports: [...imports],
  providers: [ApiCoreResolver],
})
export class ApiCoreFeatureModule {}
