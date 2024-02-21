import { Injectable } from '@nestjs/common'
import { ApiUserSnapshotService } from './api-user-snapshot.service'
import { ApiAdminSnapshotService } from './api-admin-snapshot.service'

@Injectable()
export class ApiSnapshotService {
  // Use the following command to generate the CRUD for this service for a certain actor
  // nx g api-crud --app Api --model snapshot --actor <admin|user|etc...>
  constructor(readonly user: ApiUserSnapshotService, readonly admin: ApiAdminSnapshotService) {}
}
