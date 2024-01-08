import { Injectable } from '@nestjs/common'
import { ApiAdminAppService } from './api-admin-app.service'

@Injectable()
export class ApiAppService {
  constructor(readonly admin: ApiAdminAppService) {}
}
