import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { Prisma } from '@prisma/client'
import { ApiCoreService, PagingInputFields } from '@pubkey-link/api-core-data-access'
import { LogPaging } from './entity/log.entity'

@Injectable()
export class ApiLogDataService {
  private readonly logger = new Logger(ApiLogDataService.name)
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

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async purgeLogs() {
    const logDays = process.env['LOG_DAYS'] ?? '7'
    const date = new Date(new Date().getTime() - parseInt(logDays) * 24 * 60 * 60 * 1000)
    this.logger.log(`Purging logs older than ${logDays} days... (${date})`)
    const count = await this.core.data.log.count({ where: { createdAt: { lt: date } } })
    this.logger.log(`Purging ${count} logs...`)
    const deleted = await this.core.data.log.deleteMany({ where: { createdAt: { lt: date } } })
    this.logger.log(`Purged ${deleted.count} logs`)
    return !!deleted
  }
}
