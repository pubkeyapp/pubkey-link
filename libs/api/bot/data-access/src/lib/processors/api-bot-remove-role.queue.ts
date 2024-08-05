import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq'
import { Logger } from '@nestjs/common'
import { IdentityProvider } from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { Job } from 'bullmq'
import { ApiBotInstancesService } from '../api-bot-instances.service'
import { API_BOT_REMOVE_ROLE_QUEUE } from '../helpers/api-bot.constants'
import { ApiBotRemoveRolePayload } from './api-bot-remove-role-payload'

@Processor(API_BOT_REMOVE_ROLE_QUEUE, { concurrency: parseInt(process.env['API_BOT_REMOVE_ROLE_QUEUE'] || '1') })
export class ApiBotRemoveRoleQueue extends WorkerHost {
  private readonly logger = new Logger(ApiBotRemoveRoleQueue.name)

  constructor(private readonly core: ApiCoreService, private readonly instances: ApiBotInstancesService) {
    super()
  }

  override async process(job: Job<ApiBotRemoveRolePayload, boolean | undefined, string>): Promise<boolean> {
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
    const identity = await this.core.findUserByIdentity({
      provider: IdentityProvider.Discord,
      providerId: payload.discordMember.discordId,
    })
    const author = { name: guildMember.user.username, iconURL: guildMember.user.displayAvatarURL() }
    const rolesWithNames = payload.roleIds.map((roleId) => payload.discordRoleMap[roleId])
    const message = `Removed roles from ${payload.discordMember.username}: ${rolesWithNames.join(', ')}`

    if (payload.botServer.dryRun) {
      this.logger.log(`${message} (dry run)`)
      await this.instances.sendCommandChannelInfo(payload.botServer, {
        author,
        footer: `ID: ${guildMember.user.id}`,
        description: `Removed roles from <@${payload.discordMember.discordId}>: ${payload.roleIds
          .map((role) => `<@&${role}>`)
          .join(', ')}
### ⚠️ Dry Run Enabled
> When dry run mode is enabled, no changes will be made.`,
      })
      await job.updateProgress(100)
      return true
    }

    return guildMember.roles
      .remove(payload.roleIds)
      .then(async (updated) => {
        this.logger.verbose(message)
        await Promise.all([
          job.log(`${message} (${updated ? 'success' : 'failed'})`),
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
      })
      .catch(async (e) => {
        const message = `Failed to remove roles ${payload.discordMember.username} (${payload.discordMember.discordId}) ${e.message}`
        this.logger.warn(message)
        await Promise.all([
          this.instances.sendCommandChannelError(payload.botServer, {
            author,
            footer: `ID: ${guildMember.user.id}`,
            title: `Failed to remove roles`,
            description: `Error removing roles for <@${payload.discordMember.discordId}>: ${e.message}`,
          }),
          this.core.logError(message, {
            botId: payload.botServer.botId,
            communityId: payload.communityId,
            userId: identity?.owner?.id,
            identityProvider: identity?.provider,
            identityProviderId: identity?.providerId,
          }),
        ])
        return false
      })
  }

  @OnWorkerEvent('completed')
  async onCompleted(job: Job<ApiBotRemoveRolePayload, boolean | undefined, string>) {
    this.logger.debug(`Finished ${job.name} [${job.id}]`)
  }
}
