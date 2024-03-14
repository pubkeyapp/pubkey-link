import { Injectable } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { UserCreateRolePermissionInput } from './dto/user-create-role-permission.input'

@Injectable()
export class ApiRolePermissionDataService {
  constructor(private readonly core: ApiCoreService) {}

  async create(input: UserCreateRolePermissionInput) {
    return this.core.data.rolePermission.create({
      data: {
        botRole: {
          connectOrCreate: {
            where: {
              botId_serverId_serverRoleId: {
                botId: input.botId,
                serverId: input.serverId,
                serverRoleId: input.serverRoleId,
              },
            },
            create: { botId: input.botId, serverId: input.serverId, serverRoleId: input.serverRoleId },
          },
        },
        role: { connect: { id: input.roleId } },
      },
    })
  }

  async findOne(rolePermissionId: string) {
    const found = await this.core.data.rolePermission.findUnique({ where: { id: rolePermissionId } })
    if (!found) {
      throw new Error('Role permission not found')
    }
    return found
  }

  async delete(rolePermissionId: string) {
    const deleted = await this.core.data.rolePermission.delete({ where: { id: rolePermissionId } })
    return !!deleted
  }
}
