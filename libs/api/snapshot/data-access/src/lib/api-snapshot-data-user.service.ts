import { Injectable } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { ApiSnapshotDataService } from './api-snapshot-data.service'
import { UserCreateSnapshotInput } from './dto/user-create-snapshot.input'
import { UserFindManySnapshotInput } from './dto/user-find-many-snapshot.input'
import { SnapshotPaging } from './entity/snapshot.entity'
import { getUserSnapshotWhereInput } from './helpers/get-user-snapshot-where.input'

@Injectable()
export class ApiSnapshotDataUserService {
  constructor(private readonly core: ApiCoreService, private readonly data: ApiSnapshotDataService) {}

  async createSnapshot(userId: string, input: UserCreateSnapshotInput) {
    await this.data.ensureRoleAdmin({ userId, roleId: input.roleId })
    return this.data.createSnapshot(input.roleId)
  }

  async deleteSnapshot(userId: string, snapshotId: string) {
    await this.findOneSnapshot(userId, snapshotId)
    return this.data.delete(snapshotId)
  }

  async findManySnapshot(userId: string, input: UserFindManySnapshotInput): Promise<SnapshotPaging> {
    await this.core.ensureCommunityAdmin({ userId, communityId: input.communityId })
    return this.data.findMany({
      orderBy: { createdAt: 'desc' },
      where: getUserSnapshotWhereInput(input),
      limit: input.limit,
      page: input.page,
    })
  }

  async findOneSnapshot(userId: string, snapshotId: string) {
    const found = await this.data.findOne(snapshotId)
    await this.data.ensureRoleAdmin({ userId, roleId: found.roleId })
    return found
  }
}
