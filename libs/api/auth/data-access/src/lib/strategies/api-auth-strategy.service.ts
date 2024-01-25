import { Injectable, Logger } from '@nestjs/common'
import { IdentityProvider, Prisma, UserRole, UserStatus } from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'

import type { ApiAuthRequest } from '../interfaces/api-auth.request'

@Injectable()
export class ApiAuthStrategyService {
  private readonly logger = new Logger(ApiAuthStrategyService.name)
  constructor(readonly core: ApiCoreService) {}

  async validateRequest({
    req,
    providerId,
    provider,
    profile,
    accessToken,
    refreshToken,
  }: {
    providerId: string
    provider: IdentityProvider
    accessToken: string
    refreshToken: string
    profile: Prisma.InputJsonValue
    req: ApiAuthRequest
  }) {
    const canLink = this.core.config.appConfig.authLinkProviders.includes(provider)
    const canLogin = this.core.config.appConfig.authLoginProviders.includes(provider)

    if (!canLink && !canLogin) {
      throw new Error(`This ${provider} account cannot be used to login or link.`)
    }

    if (!canLink && req.user?.id) {
      throw new Error(`This ${provider} account cannot be used to link.`)
    }

    if (!canLogin && !req.user?.id) {
      throw new Error(`This ${provider} account cannot be used to login.`)
    }

    const found = await this.core.findUserByIdentity({
      provider,
      providerId,
    })

    if (found && req.user?.id && found.ownerId !== req.user?.id) {
      throw new Error(`This ${provider} account is already linked to another user.`)
    }

    if (found && canLogin) {
      await this.core.data.identity.update({
        where: { id: found.id },
        data: { accessToken, refreshToken, verified: true, profile },
      })
      return found.owner
    }

    const identity: Prisma.IdentityCreateWithoutOwnerInput = {
      provider,
      providerId,
      accessToken,
      refreshToken,
      verified: true,
      profile,
    }

    if (req.user?.id) {
      return await this.updateUserWithIdentity(req.user.id, identity)
    }

    return await this.createUserWithIdentity(identity)
  }

  async createUserWithIdentity(identity: Prisma.IdentityCreateWithoutOwnerInput) {
    const username = await this.core.findUsername(
      (identity.profile as { username: string }).username ?? identity.providerId,
    )
    const admin = this.core.config.isAdminId(identity.provider, identity.providerId)
    this.logger.verbose(
      `Creating user ${username} with identity ${identity.providerId} (${identity.provider}) (admin: ${admin})`,
    )

    const user = await this.core.data.user.create({
      data: {
        avatarUrl: (identity.profile as { avatarUrl?: string })?.avatarUrl,
        developer: admin,
        role: admin ? UserRole.Admin : UserRole.User,
        status: UserStatus.Active,
        username,
        name: (identity.profile as { name?: string })?.name,
        identities: {
          create: {
            ...identity,
          },
        },
      },
    })
    this.logger.verbose(
      `Created user ${username} (${user.id}) with identity ${identity.providerId} (${identity.provider})`,
    )

    return user
  }

  async updateUserWithIdentity(userId: string, identity: Prisma.IdentityCreateWithoutOwnerInput) {
    const updated = await this.core.data.user.update({
      where: { id: userId },
      data: { identities: { create: { ...identity } } },
    })
    this.logger.verbose(
      `Updated user ${updated.username} (${updated.id}), added identity ${identity.providerId} (${identity.provider})`,
    )

    return updated
  }
}
