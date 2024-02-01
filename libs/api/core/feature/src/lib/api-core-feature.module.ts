import { Module } from '@nestjs/common'
import { ApiAuthFeatureModule } from '@pubkey-link/api-auth-feature'
import { ApiCoreDataAccessModule } from '@pubkey-link/api-core-data-access'
import { ApiIdentityFeatureModule } from '@pubkey-link/api-identity-feature'
import { ApiUserFeatureModule } from '@pubkey-link/api-user-feature'
import { ApiCoreController } from './api-core.controller'
import { ApiCoreResolver } from './api-core.resolver'
import { ApiCommunityFeatureModule } from '@pubkey-link/api-community-feature'
import { ApiCommunityMemberFeatureModule } from '@pubkey-link/api-community-member-feature'
import { ApiRuleFeatureModule } from '@pubkey-link/api-rule-feature'
import { ApiNetworkFeatureModule } from '@pubkey-link/api-network-feature'
import { ApiNetworkTokenFeatureModule } from '@pubkey-link/api-network-token-feature'
import { ApiBotFeatureModule } from '@pubkey-link/api-bot-feature'
import { ApiBackupFeatureModule } from '@pubkey-link/api-backup-feature'
import { ApiLogFeatureModule } from '@pubkey-link/api-log-feature'

const imports = [
  // The api-feature generator will add the imports here
  ApiAuthFeatureModule,
  ApiCoreDataAccessModule,
  ApiIdentityFeatureModule,
  ApiUserFeatureModule,
  ApiCommunityFeatureModule,
  ApiCommunityMemberFeatureModule,
  ApiRuleFeatureModule,
  ApiNetworkFeatureModule,
  ApiNetworkTokenFeatureModule,
  ApiBotFeatureModule,
  ApiBackupFeatureModule,
  ApiLogFeatureModule,
]

@Module({
  controllers: [ApiCoreController],
  imports: [...imports],
  providers: [ApiCoreResolver],
})
export class ApiCoreFeatureModule {}
