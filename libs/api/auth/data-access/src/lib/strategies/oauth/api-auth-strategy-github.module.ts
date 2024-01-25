import { type DynamicModule, Logger, Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkey-link/api-core-data-access'
import { ApiAuthStrategyService } from '../api-auth-strategy.service'
import { ApiAuthStrategyGithub } from './api-auth-strategy-github'

@Module({})
export class ApiAuthStrategyGithubModule {
  static logger = new Logger(ApiAuthStrategyGithubModule.name)
  static register(): DynamicModule {
    const enabled = this.enabled
    if (!enabled) {
      this.logger.warn(`GitHub Auth DISABLED`)
      return { module: ApiAuthStrategyGithubModule }
    }
    this.logger.verbose(`GitHub Auth ENABLED`)
    return {
      module: ApiAuthStrategyGithubModule,
      imports: [ApiCoreDataAccessModule],
      providers: [ApiAuthStrategyGithub, ApiAuthStrategyService],
    }
  }

  // TODO: These should be coming from the ApiCoreConfigService instead of process.env
  private static get enabled(): boolean {
    return (
      // GitHub auth needs to be enabled
      (!!process.env['AUTH_GITHUB_LINK_ENABLED'] || !!process.env['AUTH_GITHUB_LOGIN_ENABLED']) &&
      // And we need to have the client ID and secret set
      !!process.env['AUTH_GITHUB_CLIENT_ID'] &&
      !!process.env['AUTH_GITHUB_CLIENT_SECRET']
    )
  }
}
