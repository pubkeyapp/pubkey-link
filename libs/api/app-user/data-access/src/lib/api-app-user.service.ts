import { Injectable } from '@nestjs/common'
import { ApiAdminAppUserService } from './api-admin-app-user.service'

@Injectable()
export class ApiAppUserService {
  constructor(readonly admin: ApiAdminAppUserService) {}
}
