import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq'
import { Logger } from '@nestjs/common'
import { IdentityProvider } from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { Job } from 'bullmq'
import { ApiBotInstancesService } from '../api-bot-instances.service'
import { API_BOT_ADD_ROLE_QUEUE } from '../helpers/api-bot.constants'
import { ApiBotAddRolePayload } from './api-bot-add-role-payload'

@Processor(API_BOT_ADD_ROLE_QUEUE, { concurrency: parseInt(process.env['API_BOT_ADD_ROLE_QUEUE'] || '1') })
export class ApiBotAddRoleQueue extends WorkerHost {
  private readonly logger = new Logger(ApiBotAddRoleQueue.name)

  constructor(private readonly core: ApiCoreService, private readonly instances: ApiBotInstancesService) {
    super()
  }

  override async process(job: Job<ApiBotAddRolePayload, boolean | undefined, string>): Promise<boolean> {
    this.logger.debug(`Dequeueing ${job.name} [${job.id}]`)
    await job.updateProgress(0)
    const payload = job.data
    const { guild } = await this.instances.ensureBotInstanceGuild(payload.botServer)
    const guildMember = await this.instances.getGuildMember(guild, payload.discordMember.discordId)
    if (!guildMember) {
      this.logger.warn(
        `Member ${payload.discordMember.username} (${payload.discordMember.discordId}) not found in guild`,
      )
      return false
    }
    const rolesWithNames = payload.roleIds.map((roleId) => payload.discordRoleMap[roleId])
    const message = `Added roles to ${payload.discordMember.username}: ${rolesWithNames.join(', ')}`

    if (payload.botServer.dryRun) {
      this.logger.log(`${message} (dry run)`)
      await job.updateProgress(100)
      return true
    }

    const updated = await guildMember.roles.set(payload.roleIds)
    if (!updated) {
      this.logger.warn(`Failed to update member ${payload.discordMember.username} (${payload.discordMember.discordId})`)
      return false
    }
    const identity = await this.core.findUserByIdentity({
      provider: IdentityProvider.Discord,
      providerId: payload.discordMember.discordId,
    })
    this.logger.verbose(message)
    await Promise.all([
      job.log(`${message} (${updated ? 'success' : 'failed'})`),
      this.instances.sendCommandChannel(payload.botServer, message),
      this.core.logInfo(message, {
        botId: payload.botServer.botId,
        communityId: payload.communityId,
        userId: identity?.owner?.id,
        identityProvider: identity?.provider,
        identityProviderId: identity?.providerId,
      }),
    ])
    await job.updateProgress(100)
    return true
  }

  @OnWorkerEvent('completed')
  async onCompleted(job: Job<ApiBotAddRolePayload, boolean | undefined, string>) {
    this.logger.debug(`Finished ${job.name} [${job.id}]`)
  }
}
