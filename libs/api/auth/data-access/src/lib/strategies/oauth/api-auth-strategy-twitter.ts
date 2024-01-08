import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { IdentityProvider } from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { Profile, Strategy } from 'passport-twitter'
import type { ApiAuthRequest } from '../../interfaces/api-auth.request'
import { ApiAuthStrategyService } from '../api-auth-strategy.service'

@Injectable()
export class ApiAuthStrategyTwitter extends PassportStrategy(Strategy, 'twitter') {
  constructor(private core: ApiCoreService, private service: ApiAuthStrategyService) {
    super({
      consumerKey: core.config.authTwitterConsumerKey,
      consumerSecret: core.config.authTwitterConsumerSecret,
      callbackURL: core.config.webUrl + '/api/auth/twitter/callback',
      passReqToCallback: true,
    })
  }

  async validate(req: ApiAuthRequest, accessToken: string, refreshToken: string, profile: Profile) {
    return this.service.validateRequest({
      req,
      providerId: profile.id,
      provider: IdentityProvider.Twitter,
      accessToken,
      refreshToken,
      profile: createTwitterProfile(profile),
    })
  }
}

function createTwitterProfile(profile: Profile) {
  return {
    externalId: profile.id,
    username: profile.username,
    name: profile.displayName,
    avatarUrl: profile.photos?.[0]?.value,
  }
}
