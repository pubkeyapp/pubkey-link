import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { IdentityProvider } from '@prisma/client'
import { CookieOptions } from 'express-serve-static-core'
import { ApiCoreConfig } from './config/configuration'
import { AppConfig } from './entity/app-config.entity'

@Injectable()
export class ApiCoreConfigService {
  private readonly logger = new Logger(ApiCoreConfigService.name)
  constructor(private readonly service: ConfigService<ApiCoreConfig>) {
    if (this.authRegisterEnabled && !this.authPasswordEnabled) {
      throw new Error('Configuration error: Cannot enable AUTH_REGISTER_ENABLED without enabling AUTH_PASSWORD_ENABLED')
    }
  }

  get appConfig(): AppConfig {
    const link: IdentityProvider[] = []
    const login: IdentityProvider[] = []

    if (this.authDiscordLinkEnabled) {
      link.push(IdentityProvider.Discord)
    }
    if (this.authDiscordLoginEnabled) {
      login.push(IdentityProvider.Discord)
    }
    if (this.authGithubLinkEnabled) {
      link.push(IdentityProvider.GitHub)
    }
    if (this.authGithubLoginEnabled) {
      login.push(IdentityProvider.GitHub)
    }
    if (this.authGoogleLinkEnabled) {
      link.push(IdentityProvider.Google)
    }
    if (this.authGoogleLoginEnabled) {
      login.push(IdentityProvider.Google)
    }
    if (this.authSolanaLinkEnabled) {
      link.push(IdentityProvider.Solana)
    }
    if (this.authSolanaLoginEnabled) {
      login.push(IdentityProvider.Solana)
    }
    if (this.authTwitterLinkEnabled) {
      link.push(IdentityProvider.Twitter)
    }
    if (this.authTwitterLoginEnabled) {
      login.push(IdentityProvider.Twitter)
    }

    return {
      authLinkProviders: link,
      authLoginProviders: login,
      authPasswordEnabled: this.authPasswordEnabled,
      authRegisterEnabled: this.authRegisterEnabled,
    }
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

  get authGithubAdminIds() {
    return this.service.get<string[]>('authGithubAdminIds')
  }

  get authGithubClientId() {
    return this.service.get<string>('authGithubClientId')
  }

  get authGithubClientSecret() {
    return this.service.get<string>('authGithubClientSecret')
  }

  get authGithubScope(): string[] {
    return ['public_profile']
  }

  get authGithubStrategyOptions() {
    return {
      clientID: this.authGithubClientId,
      clientSecret: this.authGithubClientSecret,
      callbackURL: this.webUrl + '/api/auth/github/callback',
      scope: this.authGithubScope,
      passReqToCallback: true,
    }
  }

  get authGithubSecrets(): boolean {
    return !(!this.authGithubClientId || !this.authGithubClientSecret)
  }

  get authGithubLinkEnabled(): boolean {
    return (this.authGithubSecrets && this.service.get<boolean>('authGithubLinkEnabled')) ?? false
  }

  get authGithubLoginEnabled(): boolean {
    return (this.authGithubSecrets && this.service.get<boolean>('authGithubLoginEnabled')) ?? false
  }

  get authGoogleAdminIds() {
    return this.service.get<string[]>('authGoogleAdminIds')
  }

  get authGoogleClientId() {
    return this.service.get<string>('authGoogleClientId')
  }

  get authGoogleClientSecret() {
    return this.service.get<string>('authGoogleClientSecret')
  }

  get authGoogleScope(): string[] {
    return ['email', 'profile']
  }

  get authGoogleStrategyOptions() {
    return {
      clientID: this.authGoogleClientId,
      clientSecret: this.authGoogleClientSecret,
      callbackURL: this.webUrl + '/api/auth/google/callback',
      scope: this.authGoogleScope,
      passReqToCallback: true,
    }
  }

  get authGoogleSecrets(): boolean {
    return !(!this.authGoogleClientId || !this.authGoogleClientSecret)
  }

  get authGoogleLinkEnabled(): boolean {
    return (this.authGoogleSecrets && this.service.get<boolean>('authGoogleLinkEnabled')) ?? false
  }

  get authGoogleLoginEnabled(): boolean {
    return (this.authGoogleSecrets && this.service.get<boolean>('authGoogleLoginEnabled')) ?? false
  }

  get authTwitterAdminIds() {
    return this.service.get<string[]>('authTwitterAdminIds')
  }

  get authTwitterConsumerKey() {
    return this.service.get<string>('authTwitterConsumerKey')
  }

  get authTwitterConsumerSecret() {
    return this.service.get<string>('authTwitterConsumerSecret')
  }

  get authTwitterSecrets(): boolean {
    return !(!this.authTwitterConsumerKey || !this.authTwitterConsumerSecret)
  }

  get authTwitterLinkEnabled(): boolean {
    return (this.authTwitterSecrets && this.service.get<boolean>('authTwitterLinkEnabled')) ?? false
  }

  get authTwitterLoginEnabled(): boolean {
    return (this.authTwitterSecrets && this.service.get<boolean>('authTwitterLoginEnabled')) ?? false
  }

  get authPasswordEnabled(): boolean {
    return this.service.get<boolean>('authPasswordEnabled') ?? false
  }

  get authRegisterEnabled(): boolean {
    return this.service.get<boolean>('authRegisterEnabled') ?? false
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

  get apiUrl(): string {
    return this.service.get<string>('apiUrl') as string
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

  get databaseRandomData() {
    return this.service.get<boolean>('databaseRandomData')
  }

  get databaseReset() {
    return this.service.get<boolean>('databaseReset')
  }

  get environment() {
    return this.service.get('environment')
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
    return 'api'
  }

  get sessionSecret() {
    return this.service.get<string>('sessionSecret') as string
  }

  get webUrl(): string {
    return this.service.get<string>('webUrl') as string
  }

  isAdminId(provider: IdentityProvider, providerId: string) {
    switch (provider) {
      case IdentityProvider.Discord:
        return this.authDiscordAdminIds?.includes(providerId) ?? false
      case IdentityProvider.GitHub:
        return this.authGithubAdminIds?.includes(providerId) ?? false
      case IdentityProvider.Google:
        return this.authGoogleAdminIds?.includes(providerId) ?? false
      case IdentityProvider.Solana:
        return this.authSolanaAdminIds?.includes(providerId) ?? false
      case IdentityProvider.Twitter:
        return this.authTwitterAdminIds?.includes(providerId) ?? false
      default:
        return false
    }
  }
}
