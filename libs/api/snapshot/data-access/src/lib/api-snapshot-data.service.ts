import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { ApiCoreService, PagingInputFields, slugifyId } from '@pubkey-link/api-core-data-access'
import { ApiRoleService } from '@pubkey-link/api-role-data-access'
import { AppFeature } from '@pubkey-link/sdk'
import { SnapshotPaging } from './entity/snapshot.entity'

@Injectable()
export class ApiSnapshotDataService {
  constructor(private readonly core: ApiCoreService, private readonly role: ApiRoleService) {}

  async delete(snapshotId: string) {
    this.ensureFeatureEnabled()
    const deleted = await this.core.data.snapshot.delete({ where: { id: snapshotId } })
    return !!deleted
  }

  async findMany({
    limit = 10,
    page = 1,
    ...input
  }: Prisma.SnapshotFindManyArgs & PagingInputFields): Promise<SnapshotPaging> {
    this.ensureFeatureEnabled()
    return this.core.data.snapshot
      .paginate(input)
      .withPages({ limit, page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOne(snapshotId: string) {
    this.ensureFeatureEnabled()
    const found = await this.core.data.snapshot.findUnique({ where: { id: snapshotId } })
    if (!found) {
      throw new Error('Snapshot not found')
    }
    return found
  }

  async ensureRoleAdmin({ roleId, userId }: { userId: string; roleId: string }) {
    const role = await this.core.data.role.findUnique({ where: { id: roleId } })
    if (!role) {
      throw new Error('Role not found')
    }
    await this.core.ensureCommunityAdmin({ communityId: role.communityId, userId })
  }

  async createSnapshot(roleId: string) {
    this.ensureFeatureEnabled()
    const role = await this.core.data.role.findUnique({
      where: { id: roleId },
      select: { name: true, community: { select: { id: true } } },
    })
    if (!role) {
      throw new Error('Role not found')
    }

    const date = new Date().toISOString().replace(/-/g, '').split('.')[0].replace(/:/g, '').replace('T', '-')
    const name = `${date}-${role.community.id}-${slugifyId(role.name.replace('$', '').toLowerCase())}`

    const holders = await this.role.resolver.getRoleSnapshot(roleId)
    // Sort the holders by their asset count
    holders.sort((a, b) => (b.assets?.length ?? 0) - (a.assets?.length ?? 0))
    // Sort the holders by their asset balance
    holders.sort((a, b) => parseInt(b.balance ?? '0') - parseInt(a.balance ?? '0'))

    return this.core.data.snapshot.create({
      data: {
        roleId,
        name,
        data: holders.map((holder) => ({
          owner: holder.owner,
          items: holder.items,
          balance: holder.balance,
          assets: (holder.assets ?? [])?.map((asset) => ({
            mint: asset.mint,
            account: asset.account,
            balance: asset.balance,
            owner: asset.owner,
          })),
        })),
      },
      include: { role: true },
    })
  }

  protected ensureFeatureEnabled() {
    return this.core.config.ensureFeature(AppFeature.CommunitySnapshots)
  }
}
