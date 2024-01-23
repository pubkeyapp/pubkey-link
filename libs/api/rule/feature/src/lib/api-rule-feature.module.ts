import { Module } from '@nestjs/common'
import { ApiRuleDataAccessModule } from '@pubkey-link/api-rule-data-access'
import { ApiRuleResolver } from './api-rule.resolver'
import { ApiAdminRuleResolver } from './api-admin-rule.resolver'
import { ApiUserRuleResolver } from './api-user-rule.resolver'

@Module({
  imports: [ApiRuleDataAccessModule],
  providers: [ApiRuleResolver, ApiAdminRuleResolver, ApiUserRuleResolver],
})
export class ApiRuleFeatureModule {}
