import { Injectable } from '@nestjs/common'
import { AuthGuard, PassportStrategy } from '@nestjs/passport'
import { IdentityProvider } from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { Profile, Strategy } from 'passport-github'
import type { ApiAuthRequest } from '../../interfaces/api-auth.request'
import { ApiAuthStrategyService } from '../api-auth-strategy.service'

@Injectable()
export class ApiAuthStrategyGithubGuard extends AuthGuard('github') {}

@Injectable()
export class ApiAuthStrategyGithub extends PassportStrategy(Strategy, 'github') {
  constructor(private core: ApiCoreService, private service: ApiAuthStrategyService) {
    super(core.config.authGithubStrategyOptions)
  }

  async validate(req: ApiAuthRequest, accessToken: string, refreshToken: string, profile: Profile) {
    return this.service.validateRequest({
      req,
      providerId: profile.id,
      provider: IdentityProvider.GitHub,
      accessToken,
      refreshToken,
      profile: createGithubProfile(profile),
    })
  }
}

function createGithubProfile(profile: Profile) {
  return {
    externalId: profile.id,
    username: profile.username,
    avatarUrl: profile.photos?.[0].value,
    name: profile.displayName,
  }
}
