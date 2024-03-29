import { Injectable } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { UserFindManyLogInput } from './dto/user-find-many-log.input'
import { LogPaging } from './entity/log-paging.entity'
import { getUserLogWhereInput } from './helpers/get-user-log-where.input'

@Injectable()
export class ApiUserLogService {
  constructor(private readonly core: ApiCoreService) {}

  async findManyLog(userId: string, input: UserFindManyLogInput): Promise<LogPaging> {
    if (input.communityId) {
      await this.core.ensureCommunityAdmin({ communityId: input.communityId, userId })
    } else {
      throw new Error('CommunityId is required')
    }
    return this.core.data.log
      .paginate({
        orderBy: { createdAt: 'desc' },
        where: getUserLogWhereInput(input),
        include: { bot: true, identity: true },
      })
      .withPages({ limit: input.limit, page: input.page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOneLog(userId: string, logId: string) {
    const found = await this.core.data.log.findUnique({
      where: { id: logId },
      include: { bot: true, identity: true, role: true, user: true },
    })
    if (!found) {
      throw new Error('Log not found')
    }
    if (found.communityId) {
      await this.core.ensureCommunityAdmin({ communityId: found.communityId, userId })
    }
    return found
  }
}
