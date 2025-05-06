import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkey-link/api-core-data-access'
import { ApiResolverService } from './api-resolver.service'
import { ApiResolverDataService } from './api-resolver-data.service'
import { ApiResolverDataAdminService } from './api-resolver-data-admin.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiResolverService, ApiResolverDataService, ApiResolverDataAdminService],
  exports: [ApiResolverService],
})
export class ApiResolverDataAccessModule {}
