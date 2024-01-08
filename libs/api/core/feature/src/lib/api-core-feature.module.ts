import { Module } from '@nestjs/common'
import { ApiAppFeatureModule } from '@pubkey-link/api-app-feature'
import { ApiAuthFeatureModule } from '@pubkey-link/api-auth-feature'
import { ApiCoreDataAccessModule } from '@pubkey-link/api-core-data-access'
import { ApiIdentityFeatureModule } from '@pubkey-link/api-identity-feature'
import { ApiUserFeatureModule } from '@pubkey-link/api-user-feature'
import { ApiCoreController } from './api-core.controller'
import { ApiCoreResolver } from './api-core.resolver'
import { ApiAppBotFeatureModule } from '@pubkey-link/api-app-bot-feature'

const imports = [
  // The api-feature generator will add the imports here
  ApiAppFeatureModule,
  ApiAuthFeatureModule,
  ApiCoreDataAccessModule,
  ApiIdentityFeatureModule,
  ApiUserFeatureModule,
  ApiAppBotFeatureModule,
]

@Module({
  controllers: [ApiCoreController],
  imports: [...imports],
  providers: [ApiCoreResolver],
})
export class ApiCoreFeatureModule {}
