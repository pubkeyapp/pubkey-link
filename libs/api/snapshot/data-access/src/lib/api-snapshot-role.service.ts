import { Injectable } from '@nestjs/common'
import { ApiCoreService, slugifyId } from '@pubkey-link/api-core-data-access'
import { ApiRoleService } from '@pubkey-link/api-role-data-access'

@Injectable()
export class ApiSnapshotRoleService {
  constructor(private readonly core: ApiCoreService, private readonly role: ApiRoleService) {}

  async createSnapshot(roleId: string) {
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
}
