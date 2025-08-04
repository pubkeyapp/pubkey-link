import { Module } from '@nestjs/common'
import { ApiCollectionDataAccessModule } from '@pubkey-link/api-collection-data-access'
import { ApiCollectionUserResolver } from './api-collection-user.resolver'
import { ApiCollectionResolver } from './api-collection.resolver'
import { ApiCollectionAssetUserResolver } from './api-collection-asset-user.resolver'

@Module({
  imports: [ApiCollectionDataAccessModule],
  providers: [ApiCollectionResolver, ApiCollectionAssetUserResolver, ApiCollectionUserResolver],
})
export class ApiCollectionFeatureModule {}
