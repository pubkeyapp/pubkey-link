import { Injectable } from '@nestjs/common'
import { ApiAdminNetworkAssetService } from './api-admin-network-asset.service'
import { ApiNetworkAssetSyncService } from './api-network-asset-sync.service'
import { ApiUserNetworkAssetService } from './api-user-network-asset.service'

@Injectable()
export class ApiNetworkAssetService {
  constructor(
    readonly admin: ApiAdminNetworkAssetService,
    readonly user: ApiUserNetworkAssetService,
    readonly sync: ApiNetworkAssetSyncService,
  ) {}
}
