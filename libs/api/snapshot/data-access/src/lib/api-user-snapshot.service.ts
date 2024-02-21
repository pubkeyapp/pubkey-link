import { Injectable } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { ApiSnapshotRoleService } from './api-snapshot-role.service'
import { UserCreateSnapshotInput } from './dto/user-create-snapshot.input'
import { UserFindManySnapshotInput } from './dto/user-find-many-snapshot.input'
import { SnapshotPaging } from './entity/snapshot-paging.entity'
import { getUserSnapshotWhereInput } from './helpers/get-user-snapshot-where.input'

@Injectable()
export class ApiUserSnapshotService {
  constructor(private readonly core: ApiCoreService, private readonly role: ApiSnapshotRoleService) {}

  async createSnapshot(userId: string, input: UserCreateSnapshotInput) {
    await this.ensureRoleAdmin({ userId, roleId: input.roleId })
    return this.role.getRoleSnapshot(input.roleId)
  }

  async deleteSnapshot(userId: string, snapshotId: string) {
    const found = await this.findOneSnapshot(userId, snapshotId)
    const deleted = await this.core.data.snapshot.delete({ where: { id: found.id } })
    return !!deleted
  }

  async findManySnapshot(userId: string, input: UserFindManySnapshotInput): Promise<SnapshotPaging> {
    await this.core.ensureCommunityAdmin({ userId, communityId: input.communityId })
    return this.core.data.snapshot
      .paginate({
        orderBy: { createdAt: 'desc' },
        where: getUserSnapshotWhereInput(input),
      })
      .withPages({ limit: input.limit, page: input.page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOneSnapshot(userId: string, snapshotId: string) {
    const found = await this.core.data.snapshot.findUnique({ where: { id: snapshotId } })
    if (!found) {
      throw new Error('Snapshot not found')
    }
    await this.ensureRoleAdmin({ userId, roleId: found.roleId })
    return found
  }

  private async ensureRoleAdmin({ roleId, userId }: { userId: string; roleId: string }) {
    const role = await this.core.data.role.findUnique({ where: { id: roleId } })
    if (!role) {
      throw new Error('Role not found')
    }
    await this.core.ensureCommunityAdmin({ communityId: role.communityId, userId })
  }
}
