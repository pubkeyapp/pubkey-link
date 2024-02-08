import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq'
import { Logger } from '@nestjs/common'
import { BotMember } from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { Job } from 'bullmq'
import { ApiBotMemberService } from '../api-bot-member.service'
import { API_BOT_MEMBER_REMOVE } from '../helpers/api-bot.constants'

export interface ApiBotMemberRemovePayload {
  botId: string
  communityId: string
  serverId: string
  userId: string
}

@Processor(API_BOT_MEMBER_REMOVE)
export class ApiBotMemberRemoveProcessor extends WorkerHost {
  private readonly logger = new Logger(ApiBotMemberRemoveProcessor.name)
  constructor(private readonly core: ApiCoreService, private readonly member: ApiBotMemberService) {
    super()
  }

  async process(job: Job<ApiBotMemberRemovePayload, BotMember, string>): Promise<BotMember | undefined> {
    await job.updateProgress(0)
    const removed = await this.member.remove(job.data)
    if (removed) {
      await job.log(`Added ${job.data.userId} to ${job.data.serverId} by bot ${job.data.botId}`)
      await this.core.logInfo(
        job.data.communityId,
        `Added ${job.data.userId} to ${job.data.serverId} by bot ${job.data.botId}`,
        { botId: job.data.botId },
      )
      return removed
    } else {
      await job.log(`Failed to add ${job.data.userId} to ${job.data.serverId} by bot ${job.data.botId}`)
      await this.core.logError(
        job.data.communityId,
        `Failed to add ${job.data.userId} to ${job.data.serverId} by bot ${job.data.botId}`,
        { botId: job.data.botId },
      )
      return undefined
    }
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job<ApiBotMemberRemovePayload, unknown, string>) {
    this.logger.verbose('completed:', { id: job.id })
  }
}
