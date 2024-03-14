import { Injectable } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { UserCreateRoleConditionInput } from './dto/user-create-role-condition.input'
import { UserUpdateRoleConditionInput } from './dto/user-update-role-condition-input'

@Injectable()
export class ApiRoleConditionDataService {
  constructor(private readonly core: ApiCoreService) {}

  async create(input: UserCreateRoleConditionInput) {
    const token = await this.findOne(input.tokenId)
    return this.core.data.roleCondition.create({
      data: {
        role: { connect: { id: input.roleId } },
        token: { connect: { id: input.tokenId } },
        type: token.type,
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

  async updateRoleCondition(roleConditionId: string, input: UserUpdateRoleConditionInput) {
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
}
