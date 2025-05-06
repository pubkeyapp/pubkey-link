import { Injectable } from '@nestjs/common'
import { ApiResolverDataService } from './api-resolver-data.service'
import { ApiResolverDataAdminService } from './api-resolver-data-admin.service'

@Injectable()
export class ApiResolverService {
  constructor(readonly data: ApiResolverDataService, readonly admin: ApiResolverDataAdminService) {}
}
