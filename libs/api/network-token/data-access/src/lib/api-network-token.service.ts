import { Injectable } from '@nestjs/common'
import { ApiNetworkTokenDataAdminService } from './api-network-token-data-admin.service'
import { ApiNetworkTokenDataUserService } from './api-network-token-data-user.service'
import { ApiNetworkTokenDataService } from './api-network-token-data.service'

@Injectable()
export class ApiNetworkTokenService {
  constructor(
    readonly admin: ApiNetworkTokenDataAdminService,
    readonly data: ApiNetworkTokenDataService,
    readonly user: ApiNetworkTokenDataUserService,
  ) {}
}
