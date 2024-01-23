import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkey-link/api-core-data-access'
import { ApiRuleService } from './api-rule.service'
import { ApiAdminRuleService } from './api-admin-rule.service'
import { ApiUserRuleService } from './api-user-rule.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiRuleService, ApiAdminRuleService, ApiUserRuleService],
  exports: [ApiRuleService],
})
export class ApiRuleDataAccessModule {}
