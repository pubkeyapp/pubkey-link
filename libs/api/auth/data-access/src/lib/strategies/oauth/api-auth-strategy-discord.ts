import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { IdentityProvider } from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { Profile, Strategy } from 'passport-discord'
import type { ApiAuthRequest } from '../../interfaces/api-auth.request'
import { ApiAuthStrategyService } from '../api-auth-strategy.service'

@Injectable()
export class ApiAuthStrategyDiscord extends PassportStrategy(Strategy, 'discord') {
  constructor(private core: ApiCoreService, private service: ApiAuthStrategyService) {
    super(core.config.authDiscordStrategyOptions)
  }

  async validate(req: ApiAuthRequest, accessToken: string, refreshToken: string, profile: Profile) {
    return this.service.validateRequest({
      req,
      providerId: profile.id,
      provider: IdentityProvider.Discord,
      accessToken,
      refreshToken,
      profile: createDiscordProfile(profile),
    })
  }
}

function createDiscordProfile(profile: Profile) {
  const avatarUrl = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png?size=512`
  const bannerUrl = `https://cdn.discordapp.com/banners/${profile.id}/${profile.banner}.png?size=512`

  return {
    externalId: profile.id,
    username: parseInt(profile.discriminator) > 0 ? `${profile.username}#${profile.discriminator}` : profile.username,
    avatarUrl,
    bannerUrl,
    verified: profile.verified,
    fetchedAt: profile.fetchedAt,
  }
}
