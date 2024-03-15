import { Injectable } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { ApiLogDataService } from './api-log-data.service'
import { UserFindManyLogInput } from './dto/user-find-many-log.input'
import { LogPaging } from './entity/log.entity'
import { getLogWhereUserInput } from './helpers/get-log-where-user.input'

@Injectable()
export class ApiLogDataUserService {
  constructor(private readonly core: ApiCoreService, private readonly data: ApiLogDataService) {}

  async findManyLog(userId: string, input: UserFindManyLogInput): Promise<LogPaging> {
    if (input.communityId) {
      await this.core.ensureCommunityAdmin({ communityId: input.communityId, userId })
    } else {
      throw new Error('CommunityId is required')
    }
    return this.data.findMany({
      orderBy: { createdAt: 'desc' },
      where: getLogWhereUserInput(input),
      include: { bot: true, identity: true },
      limit: input.limit,
      page: input.page,
    })
  }

  async findOneLog(userId: string, logId: string) {
    const found = await this.data.findOne(logId)
    if (found.communityId) {
      await this.core.ensureCommunityAdmin({ communityId: found.communityId, userId })
    }
    return found
  }
}
