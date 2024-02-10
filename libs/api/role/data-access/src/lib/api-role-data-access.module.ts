import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkey-link/api-core-data-access'
import { ApiNetworkAssetDataAccessModule } from '@pubkey-link/api-network-asset-data-access'
import { ApiNetworkDataAccessModule } from '@pubkey-link/api-network-data-access'
import { ApiAdminRoleService } from './api-admin-role.service'
import { ApiRoleResolverService } from './api-role-resolver.service'
import { ApiRoleService } from './api-role.service'
import { ApiUserRoleService } from './api-user-role.service'

@Module({
  imports: [ApiCoreDataAccessModule, ApiNetworkDataAccessModule, ApiNetworkAssetDataAccessModule],
  providers: [ApiRoleService, ApiAdminRoleService, ApiRoleResolverService, ApiUserRoleService],
  exports: [ApiRoleService],
})
export class ApiRoleDataAccessModule {}
