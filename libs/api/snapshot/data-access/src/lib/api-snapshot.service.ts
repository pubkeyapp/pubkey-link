import { Injectable } from '@nestjs/common'
import { ApiAdminSnapshotService } from './api-admin-snapshot.service'
import { ApiUserSnapshotService } from './api-user-snapshot.service'

@Injectable()
export class ApiSnapshotService {
  constructor(readonly user: ApiUserSnapshotService, readonly admin: ApiAdminSnapshotService) {}
}
