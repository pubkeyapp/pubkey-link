import { Module } from '@nestjs/common'
import { ApiRuleDataAccessModule } from '@pubkey-link/api-rule-data-access'
import { ApiRuleResolver } from './api-rule.resolver'
import { ApiAdminRuleResolver } from './api-admin-rule.resolver'
import { ApiUserRuleResolver } from './api-user-rule.resolver'
import { ApiRulePermissionResolver } from './api-rule-permission.resolver'

@Module({
  imports: [ApiRuleDataAccessModule],
  providers: [ApiRuleResolver, ApiRulePermissionResolver, ApiAdminRuleResolver, ApiUserRuleResolver],
})
export class ApiRuleFeatureModule {}
