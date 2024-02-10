import { Injectable } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { AdminCreateRoleInput } from './dto/admin-create-role.input'
import { AdminFindManyRoleInput } from './dto/admin-find-many-role.input'
import { AdminUpdateRoleInput } from './dto/admin-update-role.input'
import { RolePaging } from './entity/role-paging.entity'
import { getAdminRoleWhereInput } from './helpers/get-admin-role-where.input'

@Injectable()
export class ApiAdminRoleService {
  constructor(private readonly core: ApiCoreService) {}

  async createRole(input: AdminCreateRoleInput) {
    return this.core.data.role.create({ data: input })
  }

  async deleteRole(roleId: string) {
    const deleted = await this.core.data.role.delete({ where: { id: roleId } })
    return !!deleted
  }

  async findManyRole(input: AdminFindManyRoleInput): Promise<RolePaging> {
    return this.core.data.role
      .paginate({
        orderBy: { createdAt: 'desc' },
        where: getAdminRoleWhereInput(input),
        include: { conditions: { include: { token: true } } },
      })
      .withPages({ limit: input.limit, page: input.page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOneRole(roleId: string) {
    return this.core.data.role.findUnique({
      where: { id: roleId },
      include: {
        conditions: { include: { token: true }, orderBy: { name: 'asc' } },
        community: true,
        permissions: { include: { bot: true } },
      },
    })
  }

  async updateRole(roleId: string, input: AdminUpdateRoleInput) {
    return this.core.data.role.update({ where: { id: roleId }, data: input })
  }
}
