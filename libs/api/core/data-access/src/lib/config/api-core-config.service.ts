import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { IdentityProvider } from '@prisma/client'
import { RedisOptions } from 'bullmq'
import { CookieOptions } from 'express-serve-static-core'
import { AppConfig, AppFeature } from '../entity/app-config.entity'
import { NetworkResolver } from '../entity/network-resolver.enum'
import { ApiCoreConfig } from './configuration'

@Injectable()
export class ApiCoreConfigService {
  private readonly logger = new Logger(ApiCoreConfigService.name)
  constructor(private readonly service: ConfigService<ApiCoreConfig>) {}

  get appConfig(): AppConfig {
    const features: AppFeature[] = []
    if (this.featureAnonCommunities) {
      features.push(AppFeature.AnonCommunities)
    }
    if (this.featureCommunityCreate) {
      features.push(AppFeature.CommunityCreate)
    }
    if (this.featureCommunitySnapshots) {
      features.push(AppFeature.CommunitySnapshots)
    }
    if (this.featureCommunityTeams) {
      features.push(AppFeature.CommunityTeams)
    }
    const link: IdentityProvider[] = []
    const login: IdentityProvider[] = []
    if (this.authDiscordLinkEnabled) {
      link.push(IdentityProvider.Discord)
    }
    if (this.authDiscordLoginEnabled) {
      login.push(IdentityProvider.Discord)
    }
    if (this.authSolanaLinkEnabled) {
      link.push(IdentityProvider.Solana)
    }
    if (this.authSolanaLoginEnabled) {
      login.push(IdentityProvider.Solana)
    }

    const resolvers: NetworkResolver[] = []
    if (this.featureResolverSolanaFungible) {
      resolvers.push(NetworkResolver.SolanaFungible)
    }
    if (this.featureResolverSolanaNonFungible) {
      resolvers.push(NetworkResolver.SolanaNonFungible)
    }
    if (this.featureResolverSolanaValidator) {
      resolvers.push(NetworkResolver.SolanaValidator)
    }

    console.log(resolvers)

    return {
      appLogoUrlDark: this.appLogoUrlDark,
      appLogoUrlLight: this.appLogoUrlLight,
      appThemeBackground: this.appThemeBackground,
      appThemeColor: this.appThemeColor,
      authLinkProviders: link,
      authLoginProviders: login,
      features,
      resolvers,
    }
  }

  get appLogoUrlDark() {
    return this.service.get<string>('appLogoUrlDark') as string
  }

  get appLogoUrlLight() {
    return this.service.get<string>('appLogoUrlLight') as string
  }

  get appThemeBackground() {
    return this.service.get<string>('appThemeBackground') as string
  }

  get appThemeColor() {
    return this.service.get<string>('appThemeColor') as string
  }

  get authDiscordAdminIds() {
    return this.service.get<string[]>('authDiscordAdminIds')
  }

  get authDiscordClientId() {
    return this.service.get<string>('authDiscordClientId')
  }

  get authDiscordClientSecret() {
    return this.service.get<string>('authDiscordClientSecret')
  }

  get authDiscordSecrets(): boolean {
    return !(!this.authDiscordClientId || !this.authDiscordClientSecret)
  }

  get authDiscordLinkEnabled(): boolean {
    return (this.authDiscordSecrets && this.service.get<boolean>('authDiscordLinkEnabled')) ?? false
  }

  get authDiscordLoginEnabled(): boolean {
    return (this.authDiscordSecrets && this.service.get<boolean>('authDiscordLoginEnabled')) ?? false
  }

  get authDiscordScope(): string[] {
    return ['guilds', 'identify']
  }

  get authDiscordStrategyOptions() {
    return {
      clientID: this.authDiscordClientId,
      clientSecret: this.authDiscordClientSecret,
      callbackURL: this.webUrl + '/api/auth/discord/callback',
      scope: this.authDiscordScope,
      passReqToCallback: true,
    }
  }

  get authSolanaAdminIds() {
    return this.service.get<string[]>('authSolanaAdminIds')
  }

  get authSolanaLinkEnabled(): boolean {
    return this.service.get<boolean>('authSolanaLinkEnabled') ?? false
  }

  get authSolanaLoginEnabled(): boolean {
    return this.service.get<boolean>('authSolanaLoginEnabled') ?? false
  }

  get authSolanaRegisterEnabled(): boolean {
    return this.service.get<boolean>('authSolanaRegisterEnabled') ?? false
  }

  get apiUrl(): string {
    return this.service.get<string>('apiUrl') as string
  }

  get botAutoStart(): boolean {
    return this.service.get<boolean>('botAutoStart') ?? false
  }

  get cookieDomains(): string[] {
    return this.service.get<string[]>('cookieDomains') ?? []
  }

  get cookieName(): string {
    return this.service.get('cookieName') as string
  }

  cookieOptions(hostname: string): CookieOptions {
    const found = this.cookieDomains.find((domain) => hostname.endsWith(domain))
    if (!found) {
      this.logger.warn(
        `Not configured to set cookies for ${hostname}. cookieDomains: ${
          this.cookieDomains.length ? this.cookieDomains.join(', ') : 'not configured'
        }`,
      )
    }
    const isSecure = this.cookieSecure ?? this.apiUrl.startsWith('https')
    return {
      httpOnly: true,
      secure: true,
      domain: found || this.cookieDomains[0],
      sameSite: isSecure ? 'none' : 'strict',
    } as CookieOptions
  }

  get cookieSecure(): boolean {
    return this.service.get('cookieSecure') as boolean
  }

  get databaseProvision() {
    return this.service.get<boolean>('databaseProvision')
  }

  ensureFeature(feature: AppFeature) {
    if (!this.appConfig.features.includes(feature)) {
      throw new Error('Feature not enabled')
    }
  }

  get environment() {
    return this.service.get('environment')
  }

  get featureAnonCommunities() {
    return this.service.get<boolean>('featureAnonCommunities')
  }

  get featureCommunityCreate() {
    return this.service.get<boolean>('featureCommunityCreate')
  }

  get featureCommunitySnapshots() {
    return this.service.get<boolean>('featureCommunitySnapshots')
  }

  get featureCommunityTeams() {
    return this.service.get<boolean>('featureCommunityTeams')
  }

  get featureResolverSolanaFungible() {
    return this.service.get<boolean>('featureResolverSolanaFungible')
  }

  get featureResolverSolanaNonFungible() {
    return this.service.get<boolean>('featureResolverSolanaNonFungible')
  }

  get featureResolverSolanaValidator() {
    return this.service.get<boolean>('featureResolverSolanaValidator')
  }

  get host() {
    return this.service.get<string>('host')
  }

  get isDevelopment(): boolean {
    return this.environment === 'development'
  }

  get jwtSecret() {
    return this.service.get<string>('jwtSecret') as string
  }

  get port() {
    return this.service.get<number>('port')
  }

  get prefix() {
    return '/api'
  }

  get redisOptions(): RedisOptions {
    // Parse the Redis URL to get the host, port, and password, etc.
    const parsed = new URL(this.redisUrl)

    // The URL class encodes the password if it contains special characters, so we need to decode it.
    // https://nodejs.org/dist/latest-v18.x/docs/api/url.html#urlpassword
    // This caused an issue because Azure Cache for Redis generates passwords that end with an equals sign.
    const password = parsed.password ? decodeURIComponent(parsed.password) : undefined

    return {
      host: parsed.hostname,
      port: Number(parsed.port),
      password: password,
      username: parsed.username,
      tls: parsed.protocol?.startsWith('rediss')
        ? {
            rejectUnauthorized: false,
          }
        : undefined,
    }
  }

  get redisUrl() {
    return this.service.get('redisUrl')
  }

  get sessionSecret() {
    return this.service.get<string>('sessionSecret') as string
  }

  get solanaCustomEndpoint() {
    return this.service.get<string>('solanaCustomEndpoint') as string
  }

  get solanaDevnetEndpoint() {
    return this.service.get<string>('solanaDevnetEndpoint') as string
  }

  get solanaMainnetEndpoint() {
    return this.service.get<string>('solanaMainnetEndpoint') as string
  }

  get solanaTestnetEndpoint() {
    return this.service.get<string>('solanaTestnetEndpoint') as string
  }

  get syncBotServers() {
    return this.service.get<boolean>('syncBotServers') ?? false
  }
  get syncNetworkAssets() {
    return this.service.get<boolean>('syncNetworkAssets') ?? false
  }
  get syncCommunityRoles() {
    return this.service.get<boolean>('syncCommunityRoles') ?? false
  }

  get webUrl(): string {
    return this.service.get<string>('webUrl') as string
  }

  isAdminId(provider: IdentityProvider, providerId: string) {
    switch (provider) {
      case IdentityProvider.Discord:
        return this.authDiscordAdminIds?.includes(providerId) ?? false
      case IdentityProvider.Solana:
        return this.authSolanaAdminIds?.includes(providerId) ?? false
      default:
        return false
    }
  }
}
