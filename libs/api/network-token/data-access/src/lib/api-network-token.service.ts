import { Injectable } from '@nestjs/common'
import { ApiNetworkTokenDataAdminService } from './api-network-token-data-admin.service'
import { ApiNetworkTokenDataUserService } from './api-network-token-data-user.service'

@Injectable()
export class ApiNetworkTokenService {
  constructor(readonly admin: ApiNetworkTokenDataAdminService, readonly user: ApiNetworkTokenDataUserService) {}
}
