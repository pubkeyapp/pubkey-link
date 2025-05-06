import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { ApiCoreService, type PagingInputFields } from '@pubkey-link/api-core-data-access'
import { ResolverPaging } from './entity/resolver.entity'

@Injectable()
export class ApiResolverDataService {
  constructor(private readonly core: ApiCoreService) {}

  async create(input: Prisma.ResolverUncheckedCreateInput) {
    return this.core.data.resolver.create({ data: input })
  }

  async delete(resolverId: string) {
    const deleted = await this.core.data.resolver.delete({ where: { id: resolverId } })
    return !!deleted
  }

  async findMany({
    limit = 10,
    page = 1,
    ...input
  }: Prisma.ResolverFindManyArgs & PagingInputFields): Promise<ResolverPaging> {
    return this.core.data.resolver
      .paginate(input)
      .withPages({ limit, page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOne(resolverId: string) {
    return this.core.data.resolver.findUnique({ where: { id: resolverId } })
  }

  async update(resolverId: string, input: Prisma.ResolverUpdateInput) {
    return this.core.data.resolver.update({ where: { id: resolverId }, data: input })
  }
}
