import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkey-link/api-core-data-access'
import { ApiNetworkAssetDataAccessModule } from '@pubkey-link/api-network-asset-data-access'
import { ApiNetworkDataAccessModule } from '@pubkey-link/api-network-data-access'
import { ApiRoleConditionDataService } from './api-role-condition-data.service'
import { ApiRoleDataAdminService } from './api-role-data-admin.service'
import { ApiRoleDataUserService } from './api-role-data-user.service'
import { ApiRoleDataService } from './api-role-data.service'
import { ApiRolePermissionDataService } from './api-role-permission-data.service'
import { ApiRoleResolverService } from './api-role-resolver.service'
import { ApiRoleService } from './api-role.service'

@Module({
  imports: [ApiCoreDataAccessModule, ApiNetworkDataAccessModule, ApiNetworkAssetDataAccessModule],
  providers: [
    ApiRoleService,
    ApiRoleConditionDataService,
    ApiRoleDataService,
    ApiRoleDataAdminService,
    ApiRoleResolverService,
    ApiRolePermissionDataService,
    ApiRoleDataUserService,
  ],
  exports: [ApiRoleService],
})
export class ApiRoleDataAccessModule {}
