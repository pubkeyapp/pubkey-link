import { Module } from '@nestjs/common'
import { ApiCoreFeatureModule } from '@pubkey-link/api-core-feature'

@Module({
  imports: [ApiCoreFeatureModule],
})
export class AppModule {}
