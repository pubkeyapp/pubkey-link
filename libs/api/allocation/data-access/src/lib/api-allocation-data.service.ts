import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { ApiCoreService, type PagingInputFields } from '@pubkey-link/api-core-data-access'
import { AllocationPaging } from './entity/allocation.entity'

@Injectable()
export class ApiAllocationDataService {
  constructor(private readonly core: ApiCoreService) {}

  async create(input: Prisma.AllocationUncheckedCreateInput) {
    return this.core.data.allocation.create({ data: input })
  }

  async delete(allocationId: string) {
    const deleted = await this.core.data.allocation.delete({ where: { id: allocationId } })
    return !!deleted
  }

  async findMany({
    limit = 10,
    page = 1,
    ...input
  }: Prisma.AllocationFindManyArgs & PagingInputFields): Promise<AllocationPaging> {
    return this.core.data.allocation
      .paginate(input)
      .withPages({ limit, page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOne(allocationId: string) {
    return this.core.data.allocation.findUnique({ where: { id: allocationId } })
  }

  async update(allocationId: string, input: Prisma.AllocationUpdateInput) {
    return this.core.data.allocation.update({ where: { id: allocationId }, data: input })
  }
}
