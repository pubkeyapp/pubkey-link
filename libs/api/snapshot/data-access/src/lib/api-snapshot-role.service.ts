import { Injectable } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'

@Injectable()
export class ApiSnapshotRoleService {
  constructor(private readonly core: ApiCoreService) {}

  async getRoleSnapshot(roleId: string) {
    const role = await this.core.data.role.findUnique({
      where: { id: roleId },
      include: { community: true, members: { include: { role: true, member: true } } },
    })
    if (!role) {
      throw new Error('Role not found')
    }
    const name = `${role.community.name} - ${role.name}`
    const data = role ?? {}
    return this.core.data.snapshot.create({
      data: { roleId, name, data },
    })
  }
}
