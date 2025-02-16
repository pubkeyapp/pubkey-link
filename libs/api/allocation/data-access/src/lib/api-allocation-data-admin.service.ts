import { Injectable } from '@nestjs/common'
import { ApiAllocationDataService } from './api-allocation-data.service'
import { AdminCreateAllocationInput } from './dto/admin-create-allocation.input'
import { AdminFindManyAllocationInput } from './dto/admin-find-many-allocation.input'
import { AdminUpdateAllocationInput } from './dto/admin-update-allocation.input'
import { AllocationPaging } from './entity/allocation.entity'
import { getAllocationWhereAdminInput } from './helpers/get-allocation-where-admin.input'

@Injectable()
export class ApiAllocationDataAdminService {
  constructor(private readonly data: ApiAllocationDataService) {}

  async createAllocation(input: AdminCreateAllocationInput) {
    return this.data.create(input)
  }

  async deleteAllocation(allocationId: string) {
    return this.data.delete(allocationId)
  }

  async findManyAllocation(input: AdminFindManyAllocationInput): Promise<AllocationPaging> {
    return this.data.findMany({
      orderBy: { createdAt: 'desc' },
      where: getAllocationWhereAdminInput(input),
      limit: input.limit,
      page: input.page,
    })
  }

  async findOneAllocation(allocationId: string) {
    return this.data.findOne(allocationId)
  }

  async updateAllocation(allocationId: string, input: AdminUpdateAllocationInput) {
    return this.data.update(allocationId, input)
  }

  async checkAllocation(allocationId: string, address: string[]) {
    console.log('checkAllocation', allocationId, address)
    return {
      success: true,
    }
  }
}
