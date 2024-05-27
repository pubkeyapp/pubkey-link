import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { ApiBotService, Bot } from '@pubkey-link/api-bot-data-access'

@Resolver(() => Bot)
export class ApiBotResolver {
  constructor(private readonly service: ApiBotService) {}

  @ResolveField(() => String)
  developersUrl(@Parent() bot: Bot) {
    return this.service.instances.developersUrl(bot.id)
  }

  @ResolveField(() => String)
  inviteUrl(@Parent() bot: Bot) {
    return this.service.instances.inviteUrl(bot.id)
  }

  @ResolveField(() => String)
  redirectUrl() {
    return this.service.instances.redirectUrl()
  }

  @ResolveField(() => Boolean, { nullable: true })
  redirectUrlSet(@Parent() bot: Bot) {
    const url = this.service.instances.redirectUrl()

    return bot.application?.redirect_uris?.includes(url)
  }

  @ResolveField(() => String)
  verificationUrl(@Parent() bot: Bot) {
    return this.service.instances.verificationUrl(bot.id)
  }

  @ResolveField(() => Boolean, { nullable: true })
  verificationUrlSet(@Parent() bot: Bot) {
    const url = this.service.instances.verificationUrl(bot.id)

    return url === bot.application?.role_connections_verification_url
  }

  @ResolveField(() => Boolean)
  started(@Parent() bot: Bot) {
    return this.service.instances.isStarted(bot.id)
  }
}
