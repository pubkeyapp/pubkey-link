import { Module } from '@nestjs/common'
import { ApiRoleDataAccessModule } from '@pubkey-link/api-role-data-access'
import { ApiRoleResolver } from './api-role.resolver'
import { ApiAdminRoleResolver } from './api-admin-role.resolver'
import { ApiUserRoleResolver } from './api-user-role.resolver'
import { ApiRolePermissionResolver } from './api-role-permission.resolver'

@Module({
  imports: [ApiRoleDataAccessModule],
  providers: [ApiRoleResolver, ApiRolePermissionResolver, ApiAdminRoleResolver, ApiUserRoleResolver],
})
export class ApiRoleFeatureModule {}
