import { Injectable, Logger } from '@nestjs/common'
import { CommunityRole } from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { ApiRoleResolverService } from './api-role-resolver.service'
import { UserCreateRoleConditionInput } from './dto/user-create-role-condition.input'
import { UserCreateRolePermissionInput } from './dto/user-create-role-permission.input'
import { UserCreateRoleInput } from './dto/user-create-role.input'
import { UserFindManyRoleInput } from './dto/user-find-many-role.input'
import { UserUpdateRoleConditionInput } from './dto/user-update-role-condition-input'
import { UserUpdateRoleInput } from './dto/user-update-role.input'
import { RolePaging } from './entity/role-paging.entity'
import { getUserRoleWhereInput } from './helpers/get-user-role-where.input'

@Injectable()
export class ApiUserRoleService {
  private readonly logger = new Logger(ApiUserRoleService.name)
  constructor(private readonly core: ApiCoreService, private readonly resolver: ApiRoleResolverService) {}

  async createRole(userId: string, input: UserCreateRoleInput) {
    await this.core.ensureCommunityAdmin({ communityId: input.communityId, userId })
    return this.core.data.role.create({ data: input })
  }

  async createRoleCondition(userId: string, input: UserCreateRoleConditionInput) {
    await this.ensureRoleAdmin({ userId, roleId: input.roleId })
    const token = await this.core.data.networkToken.findUnique({ where: { id: input.tokenId } })
    if (!token) {
      throw new Error('Token not found')
    }
    return this.core.data.roleCondition.create({
      data: {
        role: { connect: { id: input.roleId } },
        token: { connect: { id: input.tokenId } },
        type: token.type,
      },
    })
  }

  async createRolePermission(userId: string, input: UserCreateRolePermissionInput) {
    await this.ensureRoleAdmin({ userId, roleId: input.roleId })
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

  async deleteRole(userId: string, roleId: string) {
    await this.ensureRoleAdmin({ userId, roleId })
    const deleted = await this.core.data.role.delete({ where: { id: roleId } })
    return !!deleted
  }

  async deleteRoleCondition(userId: string, roleConditionId: string) {
    const found = await this.core.data.roleCondition.findUnique({
      where: { id: roleConditionId },
    })
    if (!found) {
      throw new Error('Role condition not found')
    }
    await this.ensureRoleAdmin({ userId, roleId: found.roleId })
    const deleted = await this.core.data.roleCondition.delete({ where: { id: roleConditionId } })
    return !!deleted
  }

  async deleteRolePermission(userId: string, rolePermissionId: string) {
    const found = await this.core.data.rolePermission.findUnique({
      where: { id: rolePermissionId },
    })
    if (!found) {
      throw new Error('Role permission not found')
    }
    await this.ensureRoleAdmin({ userId, roleId: found.roleId })
    const deleted = await this.core.data.rolePermission.delete({ where: { id: rolePermissionId } })
    return !!deleted
  }

  async findManyRole(userId: string, input: UserFindManyRoleInput): Promise<RolePaging> {
    await this.core.ensureCommunityAccess({ communityId: input.communityId, userId })
    return this.core.data.role
      .paginate({
        orderBy: { name: 'asc' },
        where: getUserRoleWhereInput(input),
        include: { conditions: { include: { token: true } } },
      })
      .withPages({ limit: input.limit, page: input.page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOneRole(userId: string, roleId: string) {
    await this.ensureRoleAccess({ roleId, userId })
    return this.core.data.role.findUnique({
      where: { id: roleId },
      include: {
        conditions: { include: { token: true }, orderBy: { createdAt: 'asc' } },
        community: true,
        permissions: { include: { botRole: true } },
      },
    })
  }

  async updateRole(userId: string, roleId: string, input: UserUpdateRoleInput) {
    await this.ensureRoleAdmin({ userId, roleId })
    return this.core.data.role.update({ where: { id: roleId }, data: input })
  }

  async updateRoleCondition(userId: string, roleConditionId: string, input: UserUpdateRoleConditionInput) {
    const found = await this.core.data.roleCondition.findUnique({ where: { id: roleConditionId } })
    if (!found) {
      throw new Error('Role condition not found')
    }
    await this.ensureRoleAdmin({ userId, roleId: found.roleId })
    // Amount is at least 1
    let amount = parseFloat(input.amount ?? '1')
    if (amount < 1) {
      amount = 1
    }
    // Amount Max must be higher than amount
    const amountMax = input.amountMax ? parseFloat(input.amountMax) : undefined
    if (amountMax && amountMax < amount) {
      throw new Error('Amount max must be higher than amount')
    }

    return this.core.data.roleCondition.update({
      where: { id: roleConditionId },
      data: {
        ...input,
        amount: amount.toString(),
        amountMax: amountMax?.toString(),
        config: input.config ?? undefined,
        filters: input.filters ?? undefined,
      },
    })
  }

  async userSyncCommunityRoles(userId: string, communityId: string) {
    await this.core.ensureCommunityAdmin({ communityId, userId })
    return this.resolver.syncCommunityRoles(communityId)
  }

  private async ensureRoleAdmin({ userId, roleId }: { userId: string; roleId: string }) {
    const { role, communityRole } = await this.ensureRoleAccess({ userId, roleId })
    if (communityRole !== CommunityRole.Admin) {
      throw new Error('User is not an admin')
    }
    return { role, communityRole }
  }
  private async ensureRoleAccess({ userId, roleId }: { userId: string; roleId: string }) {
    const role = await this.core.data.role.findUnique({ where: { id: roleId } })
    if (!role) {
      throw new Error('Role not found')
    }
    const communityRole = await this.core.ensureCommunityAccess({ communityId: role.communityId, userId })

    return { role, communityRole }
  }
}
