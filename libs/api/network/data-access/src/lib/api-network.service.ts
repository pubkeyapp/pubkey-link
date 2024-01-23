import { Injectable } from '@nestjs/common'
import { ApiAdminNetworkService } from './api-admin-network.service'

@Injectable()
export class ApiNetworkService {
  constructor(readonly admin: ApiAdminNetworkService) {}
}
