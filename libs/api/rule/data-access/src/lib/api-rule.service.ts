import { Injectable } from '@nestjs/common'
import { ApiAdminRuleService } from './api-admin-rule.service'
import { ApiUserRuleService } from './api-user-rule.service'

@Injectable()
export class ApiRuleService {
  constructor(readonly admin: ApiAdminRuleService, readonly user: ApiUserRuleService) {}
}
