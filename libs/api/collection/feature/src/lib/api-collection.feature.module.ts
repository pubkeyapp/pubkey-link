import { Module } from '@nestjs/common'
import { ApiCollectionDataAccessModule } from '@pubkey-link/api-collection-data-access'
import { ApiCollectionUserResolver } from './api-collection-user.resolver'
import { ApiCollectionResolver } from './api-collection.resolver'

@Module({
  imports: [ApiCollectionDataAccessModule],
  providers: [ApiCollectionResolver, ApiCollectionUserResolver],
})
export class ApiCollectionFeatureModule {}
