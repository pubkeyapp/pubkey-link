import { Module } from '@nestjs/common'
import { ApiAuthFeatureModule } from '@pubkey-link/api-auth-feature'
import { ApiCoreDataAccessModule } from '@pubkey-link/api-core-data-access'
import { ApiIdentityFeatureModule } from '@pubkey-link/api-identity-feature'
import { ApiUserFeatureModule } from '@pubkey-link/api-user-feature'
import { ApiCoreController } from './api-core.controller'
import { ApiCoreResolver } from './api-core.resolver'

const imports = [ApiAuthFeatureModule, ApiCoreDataAccessModule, ApiIdentityFeatureModule, ApiUserFeatureModule]

@Module({
  controllers: [ApiCoreController],
  imports: [...imports],
  providers: [ApiCoreResolver],
})
export class ApiCoreFeatureModule {}
