import { Injectable, Logger } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { ApiCoreService, PagingInputFields } from '@pubkey-link/api-core-data-access'
import { User } from 'discord.js'
import { ApiBotDataManagerService } from './api-bot-data-manager.service'
import { BotPaging } from './entity/bot.entity'

@Injectable()
export class ApiBotDataService {
  private readonly logger = new Logger(ApiBotDataService.name)
  constructor(private readonly core: ApiCoreService, private readonly manager: ApiBotDataManagerService) {}

  async create(input: Omit<Prisma.BotUncheckedCreateInput, 'name'>) {
    const user: User = await this.manager.getBotUser(input.token)
    this.logger.verbose(`Creating bot ${user.username}`)
    const avatarUrl = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=1024`
    return this.core.data.bot.create({
      data: {
        id: user.id,
        ...input,
        avatarUrl,
        name: user.username,
      },
    })
  }

  async delete(botId: string) {
    const deleted = await this.core.data.bot.delete({ where: { id: botId } })
    return !!deleted
  }

  async findMany({ limit = 10, page = 1, ...input }: Prisma.BotFindManyArgs & PagingInputFields): Promise<BotPaging> {
    return this.core.data.bot
      .paginate(input)
      .withPages({ limit, page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOne(botId: string) {
    const found = await this.core.data.bot.findUnique({ where: { id: botId }, include: { community: true } })
    if (!found) {
      throw new Error(`Bot not found: ${botId}`)
    }
    return found
  }

  async findByCommunityId(communityId: string) {
    const found = await this.core.data.bot.findUnique({ where: { communityId } })
    if (!found) {
      return null
    }
    return found
  }

  async update(botId: string, input: Prisma.BotUpdateInput) {
    return this.core.data.bot.update({ where: { id: botId }, data: input })
  }
}
