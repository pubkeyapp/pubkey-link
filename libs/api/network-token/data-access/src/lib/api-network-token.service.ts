import { Injectable } from '@nestjs/common'
import { ApiAdminNetworkTokenService } from './api-admin-network-token.service'

@Injectable()
export class ApiNetworkTokenService {
  // Use the following command to generate the CRUD for this service for a certain actor
  // nx g api-crud --app Api --model network-token --actor <admin|user|etc...>
  constructor(readonly admin: ApiAdminNetworkTokenService) {}
}
