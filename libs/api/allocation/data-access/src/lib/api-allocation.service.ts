import { Injectable } from '@nestjs/common'
import { ApiAllocationDataService } from './api-allocation-data.service'
import { ApiAllocationDataAdminService } from './api-allocation-data-admin.service'

@Injectable()
export class ApiAllocationService {
  constructor(readonly data: ApiAllocationDataService, readonly admin: ApiAllocationDataAdminService) {}
}
