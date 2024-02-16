import { Processor, WorkerHost } from '@nestjs/bullmq'
import { Logger } from '@nestjs/common'
import { BotMember, IdentityProvider } from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { Job } from 'bullmq'
import { ApiBotMemberService } from '../api-bot-member.service'
import { API_BOT_MEMBER_UPSERT } from '../helpers/api-bot.constants'

export interface ApiBotMemberUpsertPayload {
  botId: string
  communityId: string
  serverId: string
  userId: string
  roleIds: string[]
}

@Processor(API_BOT_MEMBER_UPSERT)
export class ApiBotMemberUpsertProcessor extends WorkerHost {
  private readonly logger = new Logger(ApiBotMemberUpsertProcessor.name)
  constructor(private readonly core: ApiCoreService, private readonly member: ApiBotMemberService) {
    super()
  }

  override async process(
    job: Job<ApiBotMemberUpsertPayload, BotMember | undefined, string>,
  ): Promise<BotMember | undefined> {
    console.log('process add')
    await job.updateProgress(0)
    const updated = await this.member.upsert(job.data)
    if (updated) {
      await job.log(`Added ${job.data.userId} to ${job.data.serverId} by bot ${job.data.botId}`)
      await this.core.logInfo(`Updated bot membership`, {
        botId: job.data.botId,
        communityId: job.data.communityId,
        identityProvider: IdentityProvider.Discord,
        identityProviderId: job.data.userId,
        relatedId: updated.id,
        relatedType: 'BotMember',
        data: {
          botId: job.data.botId,
          serverId: job.data.serverId,
          roleIds: job.data.roleIds,
          memberId: job.data.userId,
        },
      })
      return updated
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
