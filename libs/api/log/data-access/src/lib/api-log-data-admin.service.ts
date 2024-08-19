import { Injectable } from '@nestjs/common'
import { ApiLogDataService } from './api-log-data.service'
import { AdminFindManyLogInput } from './dto/admin-find-many-log.input'
import { LogPaging } from './entity/log.entity'
import { getLogWhereAdminInput } from './helpers/get-log-where-admin.input'

@Injectable()
export class ApiLogDataAdminService {
  constructor(private readonly data: ApiLogDataService) {}

  async deleteLog(logId: string) {
    return this.data.delete(logId)
  }

  async findManyLog(input: AdminFindManyLogInput): Promise<LogPaging> {
    return this.data.findMany({
      orderBy: { createdAt: 'desc' },
      where: getLogWhereAdminInput(input),
      include: { bot: true, identity: true, networkAsset: true, role: true, user: true },
      limit: input.limit,
      page: input.page,
    })
  }

  async findOneLog(logId: string) {
    return this.data.findOne(logId)
  }

  async purgeLogs() {
    return this.data.purgeLogs()
  }
}
