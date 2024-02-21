import { Injectable } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { ApiRoleService } from '@pubkey-link/api-role-data-access'

@Injectable()
export class ApiSnapshotRoleService {
  constructor(private readonly core: ApiCoreService, private readonly role: ApiRoleService) {}

  async createSnapshot(roleId: string) {
    const role = await this.core.data.role.findUnique({
      where: { id: roleId },
      select: { name: true, community: { select: { name: true } } },
    })
    if (!role) {
      throw new Error('Role not found')
    }

    const date = new Date().toISOString().split('T')[0].replace(/-/g, '')
    const name = `${date} - ${role.community.name} - ${role.name}`

    const holders = await this.role.resolver.getRoleSnapshot(roleId)
    // Sort the holders by their asset count
    holders.sort((a, b) => (b.assets?.length ?? 0) - (a.assets?.length ?? 0))
    // Sort the holders by their asset balance

    return this.core.data.snapshot.create({
      data: {
        roleId,
        name,
        data: holders.map((holder) => ({
          ...holder,
          assets: (holder.assets ?? [])?.map((asset) => ({
            mint: asset.mint,
            account: asset.account,
            balance: asset.balance,
            owner: asset.owner,
          })),
        })),
      },
    })
  }
}
