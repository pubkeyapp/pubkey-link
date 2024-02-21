import { Injectable } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { ApiSnapshotRoleService } from './api-snapshot-role.service'
import { AdminCreateSnapshotInput } from './dto/admin-create-snapshot.input'
import { AdminFindManySnapshotInput } from './dto/admin-find-many-snapshot.input'
import { SnapshotPaging } from './entity/snapshot-paging.entity'
import { getAdminSnapshotWhereInput } from './helpers/get-admin-snapshot-where.input'

@Injectable()
export class ApiAdminSnapshotService {
  constructor(private readonly core: ApiCoreService, private readonly role: ApiSnapshotRoleService) {}

  async createSnapshot(input: AdminCreateSnapshotInput) {
    return this.role.createSnapshot(input.roleId)
  }

  async deleteSnapshot(snapshotId: string) {
    const deleted = await this.core.data.snapshot.delete({ where: { id: snapshotId } })
    return !!deleted
  }

  async findManySnapshot(input: AdminFindManySnapshotInput): Promise<SnapshotPaging> {
    return this.core.data.snapshot
      .paginate({
        orderBy: { createdAt: 'desc' },
        where: getAdminSnapshotWhereInput(input),
      })
      .withPages({ limit: input.limit, page: input.page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOneSnapshot(snapshotId: string) {
    return this.core.data.snapshot.findUnique({ where: { id: snapshotId }, include: { role: true } })
  }
}
