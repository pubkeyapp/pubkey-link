import { type DynamicModule, Logger, Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkey-link/api-core-data-access'
import { ApiAuthStrategyService } from '../api-auth-strategy.service'
import { ApiAuthStrategyGoogle } from './api-auth-strategy-google'

@Module({})
export class ApiAuthStrategyGoogleModule {
  static logger = new Logger(ApiAuthStrategyGoogleModule.name)
  static register(): DynamicModule {
    const enabled = this.enabled
    if (!enabled) {
      this.logger.warn(`Google Auth DISABLED`)
      return { module: ApiAuthStrategyGoogleModule }
    }
    this.logger.verbose(`Google Auth ENABLED`)
    return {
      module: ApiAuthStrategyGoogleModule,
      imports: [ApiCoreDataAccessModule],
      providers: [ApiAuthStrategyGoogle, ApiAuthStrategyService],
    }
  }

  // TODO: These should be coming from the ApiCoreConfigService instead of process.env
  private static get enabled(): boolean {
    return (
      // Google auth needs to be enabled
      (!!process.env['AUTH_GOOGLE_LINK_ENABLED'] || !!process.env['AUTH_GOOGLE_LOGIN_ENABLED']) &&
      // And we need to have the client ID and secret set
      !!process.env['AUTH_GOOGLE_CLIENT_ID'] &&
      !!process.env['AUTH_GOOGLE_CLIENT_SECRET']
    )
  }
}
