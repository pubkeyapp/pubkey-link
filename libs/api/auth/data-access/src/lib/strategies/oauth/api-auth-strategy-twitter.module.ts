import { type DynamicModule, Logger, Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkey-link/api-core-data-access'
import { ApiAuthStrategyService } from '../api-auth-strategy.service'
import { ApiAuthStrategyTwitter } from './api-auth-strategy-twitter'

@Module({})
export class ApiAuthStrategyTwitterModule {
  static logger = new Logger(ApiAuthStrategyTwitterModule.name)
  static register(): DynamicModule {
    const enabled = this.enabled
    if (!enabled) {
      this.logger.warn(`Twitter Auth DISABLED`)
      return { module: ApiAuthStrategyTwitterModule }
    }
    this.logger.verbose(`Twitter Auth ENABLED`)
    return {
      module: ApiAuthStrategyTwitterModule,
      imports: [ApiCoreDataAccessModule],
      providers: [ApiAuthStrategyTwitter, ApiAuthStrategyService],
    }
  }

  // TODO: These should be coming from the ApiCoreConfigService instead of process.env
  private static get enabled(): boolean {
    return (
      // Twitter auth needs to be enabled
      (!!process.env['AUTH_TWITTER_LINK_ENABLED'] || !!process.env['AUTH_TWITTER_LOGIN_ENABLED']) &&
      // And we need to have the client ID and secret set
      !!process.env['AUTH_TWITTER_CONSUMER_KEY'] &&
      !!process.env['AUTH_TWITTER_CONSUMER_SECRET']
    )
  }
}
