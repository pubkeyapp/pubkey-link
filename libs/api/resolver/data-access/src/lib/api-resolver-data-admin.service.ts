import { Injectable } from '@nestjs/common'
import { ApiResolverDataService } from './api-resolver-data.service'
import { AdminCreateResolverInput } from './dto/admin-create-resolver.input'
import { AdminFindManyResolverInput } from './dto/admin-find-many-resolver.input'
import { AdminUpdateResolverInput } from './dto/admin-update-resolver.input'
import { ResolverPaging } from './entity/resolver.entity'
import { getResolverWhereAdminInput } from './helpers/get-resolver-where-admin.input'

@Injectable()
export class ApiResolverDataAdminService {
  constructor(private readonly data: ApiResolverDataService) {}

  async createResolver(input: AdminCreateResolverInput) {
    return this.data.create({ ...input, name: input.type })
  }

  async deleteResolver(resolverId: string) {
    return this.data.delete(resolverId)
  }

  async findManyResolver(input: AdminFindManyResolverInput): Promise<ResolverPaging> {
    return this.data.findMany({
      orderBy: { createdAt: 'desc' },
      where: getResolverWhereAdminInput(input),
      limit: input.limit,
      page: input.page,
    })
  }

  async findOneResolver(resolverId: string) {
    return this.data.findOne(resolverId)
  }

  async updateResolver(resolverId: string, input: AdminUpdateResolverInput) {
    return this.data.update(resolverId, input)
  }
}
