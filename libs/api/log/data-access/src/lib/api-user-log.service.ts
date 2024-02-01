import { Injectable } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { UserFindManyLogInput } from './dto/user-find-many-log.input'
import { LogPaging } from './entity/log-paging.entity'
import { getUserLogWhereInput } from './helpers/get-user-log-where.input'

@Injectable()
export class ApiUserLogService {
  constructor(private readonly core: ApiCoreService) {}

  async deleteLog(logId: string) {
    const deleted = await this.core.data.log.delete({ where: { id: logId } })
    return !!deleted
  }

  async findManyLog(input: UserFindManyLogInput): Promise<LogPaging> {
    return this.core.data.log
      .paginate({
        orderBy: { createdAt: 'desc' },
        where: getUserLogWhereInput(input),
      })
      .withPages({ limit: input.limit, page: input.page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOneLog(logId: string) {
    return this.core.data.log.findUnique({ where: { id: logId } })
  }
}
