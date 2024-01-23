import { Injectable } from '@nestjs/common'
import { ApiAdminNetworkTokenService } from './api-admin-network-token.service'
import { ApiUserNetworkTokenService } from './api-user-network-token.service'

@Injectable()
export class ApiNetworkTokenService {
  constructor(readonly admin: ApiAdminNetworkTokenService, readonly user: ApiUserNetworkTokenService) {}
}
