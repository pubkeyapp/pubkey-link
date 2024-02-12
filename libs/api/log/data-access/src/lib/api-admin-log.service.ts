import { Injectable } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { AdminFindManyLogInput } from './dto/admin-find-many-log.input'
import { LogPaging } from './entity/log-paging.entity'
import { getAdminLogWhereInput } from './helpers/get-admin-log-where.input'

@Injectable()
export class ApiAdminLogService {
  constructor(private readonly core: ApiCoreService) {}

  async deleteLog(logId: string) {
    const deleted = await this.core.data.log.delete({ where: { id: logId } })
    return !!deleted
  }

  async findManyLog(input: AdminFindManyLogInput): Promise<LogPaging> {
    return this.core.data.log
      .paginate({
        orderBy: { createdAt: 'desc' },
        where: getAdminLogWhereInput(input),
        include: { bot: true, identity: true, networkAsset: true, role: true, user: true },
      })
      .withPages({ limit: input.limit, page: input.page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOneLog(logId: string) {
    return this.core.data.log.findUnique({
      where: { id: logId },
      include: { bot: true, identity: true, networkAsset: true, role: true, user: true },
    })
  }
}
