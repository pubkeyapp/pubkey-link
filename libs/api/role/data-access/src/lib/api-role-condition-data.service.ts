import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { ApiNetworkTokenService } from '@pubkey-link/api-network-token-data-access'

@Injectable()
export class ApiRoleConditionDataService {
  constructor(private readonly core: ApiCoreService, private readonly networkToken: ApiNetworkTokenService) {}

  async create(input: Omit<Prisma.RoleConditionUncheckedCreateInput, 'type'>) {
    const token = await this.networkToken.data.findOne(input.tokenId)
    return this.core.data.roleCondition.create({
      data: {
        role: { connect: { id: input.roleId } },
        token: { connect: { id: input.tokenId } },
        type: token.type,
        amount: '1',
      },
    })
  }

  async findOne(roleConditionId: string) {
    const found = await this.core.data.roleCondition.findUnique({ where: { id: roleConditionId } })
    if (!found) {
      throw new Error('Role condition not found')
    }
    return found
  }

  async deleteRoleCondition(roleConditionId: string) {
    const deleted = await this.core.data.roleCondition.delete({ where: { id: roleConditionId } })
    return !!deleted
  }

  async updateRoleCondition(roleConditionId: string, input: Prisma.RoleConditionUpdateInput) {
    // Amount is at least 1
    let amount = input.amount && typeof input.amount === 'string' ? parseFloat(input.amount) : 1
    if (amount < 1) {
      amount = 1
    }
    // Amount Max must be higher than amount
    const amountMax = input.amountMax && typeof input.amountMax === 'string' ? parseFloat(input.amountMax) : undefined
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
}
