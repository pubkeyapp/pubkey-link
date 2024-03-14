import { Injectable } from '@nestjs/common'
import { ApiSnapshotDataAdminService } from './api-snapshot-data-admin.service'
import { ApiSnapshotDataUserService } from './api-snapshot-data-user.service'

@Injectable()
export class ApiSnapshotService {
  constructor(readonly user: ApiSnapshotDataUserService, readonly admin: ApiSnapshotDataAdminService) {}
}
