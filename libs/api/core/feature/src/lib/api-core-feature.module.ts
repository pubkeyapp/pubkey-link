import { Module } from '@nestjs/common'
import { ApiAuthFeatureModule } from '@pubkey-link/api-auth-feature'
import { ApiCoreDataAccessModule } from '@pubkey-link/api-core-data-access'
import { ApiIdentityFeatureModule } from '@pubkey-link/api-identity-feature'
import { ApiUserFeatureModule } from '@pubkey-link/api-user-feature'
import { ApiCoreController } from './api-core.controller'
import { ApiCoreResolver } from './api-core.resolver'
import { ApiCommunityFeatureModule } from '@pubkey-link/api-community-feature'
import { ApiCommunityMemberFeatureModule } from '@pubkey-link/api-community-member-feature'
import { ApiRoleFeatureModule } from '@pubkey-link/api-role-feature'
import { ApiNetworkFeatureModule } from '@pubkey-link/api-network-feature'
import { ApiNetworkTokenFeatureModule } from '@pubkey-link/api-network-token-feature'
import { ApiBotFeatureModule } from '@pubkey-link/api-bot-feature'
import { ApiBackupFeatureModule } from '@pubkey-link/api-backup-feature'
import { ApiLogFeatureModule } from '@pubkey-link/api-log-feature'
import { ApiNetworkAssetFeatureModule } from '@pubkey-link/api-network-asset-feature'
import { ApiSnapshotFeatureModule } from '@pubkey-link/api-snapshot-feature'

const imports = [
  // The api-feature generator will add the imports here
  ApiAuthFeatureModule,
  ApiCoreDataAccessModule,
  ApiIdentityFeatureModule,
  ApiUserFeatureModule,
  ApiCommunityFeatureModule,
  ApiCommunityMemberFeatureModule,
  ApiRoleFeatureModule,
  ApiNetworkFeatureModule,
  ApiNetworkTokenFeatureModule,
  ApiBotFeatureModule,
  ApiBackupFeatureModule,
  ApiLogFeatureModule,
  ApiNetworkAssetFeatureModule,
  ApiSnapshotFeatureModule,
]

@Module({
  controllers: [ApiCoreController],
  imports: [...imports],
  providers: [ApiCoreResolver],
})
export class ApiCoreFeatureModule {}
