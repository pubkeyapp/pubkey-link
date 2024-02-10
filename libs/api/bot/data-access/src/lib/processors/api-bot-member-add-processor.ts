import { Processor, WorkerHost } from '@nestjs/bullmq'
import { Logger } from '@nestjs/common'
import { BotMember, IdentityProvider } from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { Job } from 'bullmq'
import { ApiBotMemberService } from '../api-bot-member.service'
import { API_BOT_MEMBER_ADD } from '../helpers/api-bot.constants'

export interface ApiBotMemberAddPayload {
  botId: string
  communityId: string
  serverId: string
  userId: string
}

@Processor(API_BOT_MEMBER_ADD)
export class ApiBotMemberAddProcessor extends WorkerHost {
  private readonly logger = new Logger(ApiBotMemberAddProcessor.name)
  constructor(private readonly core: ApiCoreService, private readonly member: ApiBotMemberService) {
    super()
  }

  override async process(
    job: Job<ApiBotMemberAddPayload, BotMember | undefined, string>,
  ): Promise<BotMember | undefined> {
    await job.updateProgress(0)
    const added = await this.member.upsert(job.data)
    if (added) {
      await job.log(`Added ${job.data.userId} to ${job.data.serverId} by bot ${job.data.botId}`)
      await this.core.logInfo(`Added bot member`, {
        botId: job.data.botId,
        communityId: job.data.communityId,
        identityProvider: IdentityProvider.Discord,
        identityProviderId: job.data.userId,
        relatedId: added.id,
        relatedType: 'BotMember',
        data: { botId: job.data.botId, serverId: job.data.serverId, userId: job.data.userId },
      })
      return added
    } else {
      await job.log(`Failed to add ${job.data.userId} to ${job.data.serverId} by bot ${job.data.botId}`)
      await this.core.logError(`Failed to add ${job.data.userId} to ${job.data.serverId} by bot ${job.data.botId}`, {
        botId: job.data.botId,
        communityId: job.data.communityId,
        identityProvider: IdentityProvider.Discord,
        identityProviderId: job.data.userId,
        data: { botId: job.data.botId, serverId: job.data.serverId, userId: job.data.userId },
      })
      return undefined
    }
  }
}
