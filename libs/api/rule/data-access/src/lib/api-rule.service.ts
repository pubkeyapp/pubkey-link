import { Injectable } from '@nestjs/common'
import { ApiAdminRuleService } from './api-admin-rule.service'
import { ApiUserRuleService } from './api-user-rule.service'

@Injectable()
export class ApiRuleService {
  // Use the following command to generate the CRUD for this service for a certain actor
  // nx g api-crud --app Api --model rule --actor <admin|user|etc...>
  constructor(readonly admin: ApiAdminRuleService, readonly user: ApiUserRuleService) {}
}
