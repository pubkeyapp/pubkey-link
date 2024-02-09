import { Injectable } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { UserFindManyLogInput } from './dto/user-find-many-log.input'
import { LogPaging } from './entity/log-paging.entity'
import { getUserLogWhereInput } from './helpers/get-user-log-where.input'

@Injectable()
export class ApiUserLogService {
  constructor(private readonly core: ApiCoreService) {}

  async findManyLog(userId: string, input: UserFindManyLogInput): Promise<LogPaging> {
    await this.core.ensureCommunityAdmin({ communityId: input.communityId, userId })
    return this.core.data.log
      .paginate({
        orderBy: { createdAt: 'desc' },
        where: getUserLogWhereInput(input),
      })
      .withPages({ limit: input.limit, page: input.page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOneLog(userId: string, logId: string) {
    const found = await this.core.data.log.findUnique({
      where: { id: logId },
      include: { bot: true, identity: true, rule: true, user: true },
    })
    if (!found) {
      throw new Error('Log not found')
    }
    await this.core.ensureCommunityAdmin({ communityId: found.communityId, userId })
    return found
  }
}
