import { Injectable, Logger } from '@nestjs/common'
import { ApiBotDataService } from './api-bot-data.service'
import { AdminCreateBotInput } from './dto/admin-create-bot.input'
import { AdminFindManyBotInput } from './dto/admin-find-many-bot.input'
import { AdminUpdateBotInput } from './dto/admin-update-bot.input'
import { BotPaging } from './entity/bot.entity'
import { getBotWhereAdminInput } from './helpers/get-bot-where-admin.input'

@Injectable()
export class ApiBotDataAdminService {
  private readonly logger = new Logger(ApiBotDataAdminService.name)
  constructor(private readonly data: ApiBotDataService) {}

  async createBot(input: AdminCreateBotInput) {
    return this.data.create(input)
  }

  async deleteBot(botId: string) {
    return this.data.delete(botId)
  }

  async findManyBot(input: AdminFindManyBotInput): Promise<BotPaging> {
    return this.data.findMany({
      orderBy: { createdAt: 'desc' },
      where: getBotWhereAdminInput(input),
      limit: input.limit,
      page: input.page,
    })
  }

  async findOneBot(botId: string) {
    return this.data.findOne(botId)
  }

  async updateBot(botId: string, input: AdminUpdateBotInput) {
    return this.data.update(botId, input)
  }
}
