import { Injectable } from '@nestjs/common'
import { AuthGuard, PassportStrategy } from '@nestjs/passport'
import { IdentityProvider } from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { Profile, Strategy } from 'passport-google-oauth20'
import type { ApiAuthRequest } from '../../interfaces/api-auth.request'
import { ApiAuthStrategyService } from '../api-auth-strategy.service'

@Injectable()
export class ApiAuthStrategyGoogleGuard extends AuthGuard('google') {}

@Injectable()
export class ApiAuthStrategyGoogle extends PassportStrategy(Strategy, 'google') {
  constructor(private core: ApiCoreService, private service: ApiAuthStrategyService) {
    super(core.config.authGoogleStrategyOptions)
  }

  async validate(req: ApiAuthRequest, accessToken: string, refreshToken: string, profile: Profile) {
    return this.service.validateRequest({
      req,
      providerId: profile.id,
      provider: IdentityProvider.Google,
      accessToken,
      refreshToken,
      profile: createGoogleProfile(profile),
    })
  }
}

function createGoogleProfile(profile: Profile) {
  return {
    externalId: profile.id,
    username: profile.username,
    avatarUrl: profile.photos?.[0].value,
    name: profile.displayName,
  }
}
