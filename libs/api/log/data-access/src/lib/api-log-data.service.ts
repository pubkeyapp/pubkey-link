import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { ApiCoreService, PagingInputFields } from '@pubkey-link/api-core-data-access'
import { LogPaging } from './entity/log.entity'

@Injectable()
export class ApiLogDataService {
  constructor(private readonly core: ApiCoreService) {}

  async delete(logId: string) {
    const deleted = await this.core.data.log.delete({ where: { id: logId } })
    return !!deleted
  }

  async findMany({ limit = 10, page = 1, ...input }: Prisma.LogFindManyArgs & PagingInputFields): Promise<LogPaging> {
    return this.core.data.log
      .paginate(input)
      .withPages({ limit, page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOne(logId: string) {
    const found = await this.core.data.log.findUnique({
      where: { id: logId },
      include: { bot: true, identity: true, networkAsset: true, role: true, user: true },
    })
    if (!found) {
      throw new Error('Log not found')
    }
    return found
  }
}
