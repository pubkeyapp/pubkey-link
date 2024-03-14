import { Injectable } from '@nestjs/common'
import { ApiSnapshotDataService } from './api-snapshot-data.service'
import { AdminCreateSnapshotInput } from './dto/admin-create-snapshot.input'
import { AdminFindManySnapshotInput } from './dto/admin-find-many-snapshot.input'
import { SnapshotPaging } from './entity/snapshot.entity'
import { getSnapshotWhereAdminInput } from './helpers/get-snapshot-where-admin.input'

@Injectable()
export class ApiSnapshotDataAdminService {
  constructor(private readonly data: ApiSnapshotDataService) {}

  async createSnapshot(input: AdminCreateSnapshotInput) {
    return this.data.createSnapshot(input.roleId)
  }

  async deleteSnapshot(snapshotId: string) {
    return this.data.delete(snapshotId)
  }

  async findManySnapshot(input: AdminFindManySnapshotInput): Promise<SnapshotPaging> {
    return this.data.findMany({
      orderBy: { createdAt: 'desc' },
      where: getSnapshotWhereAdminInput(input),
      limit: input.limit,
      page: input.page,
    })
  }

  async findOneSnapshot(snapshotId: string) {
    return this.data.findOne(snapshotId)
  }
}
