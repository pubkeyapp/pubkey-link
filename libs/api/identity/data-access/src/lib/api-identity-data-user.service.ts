import { Injectable, Logger } from '@nestjs/common'
import { Identity as PrismaIdentity, IdentityProvider, NetworkCluster, UserRole } from '@prisma/client'
import { ApiCoreService, BaseContext, getRequestDetails } from '@pubkey-link/api-core-data-access'
import { ApiNetworkAssetService } from '@pubkey-link/api-network-asset-data-access'
import { ApiNetworkService } from '@pubkey-link/api-network-data-access'
import { User } from '@pubkey-link/api-user-data-access'
import { verifyMessageSignature } from '@pubkey-link/verify-wallet'

import { ApiIdentitySolanaService } from './api-identity-solana.service'
import { LinkIdentityInput } from './dto/link-identity-input'
import { RequestIdentityChallengeInput } from './dto/request-identity-challenge.input'
import { UserFindManyIdentityInput } from './dto/user-find-many-identity-input'
import { UserUpdateIdentityInput } from './dto/user-update-identity.input'
import { VerifyIdentityChallengeInput } from './dto/verify-identity-challenge-input'
import { sha256 } from './helpers/sha256'

@Injectable()
export class ApiIdentityDataUserService {
  private readonly logger = new Logger(ApiIdentityDataUserService.name)
  constructor(
    private readonly core: ApiCoreService,
    private readonly solana: ApiIdentitySolanaService,
    private readonly network: ApiNetworkService,
    private readonly networkAsset: ApiNetworkAssetService,
  ) {}

  async deleteIdentity(userId: string, identityId: string): Promise<boolean> {
    const found = await this.core.data.identity.findFirst({
      where: { id: identityId, ownerId: userId },
      include: { owner: { include: { identities: true } } },
    })
    if (!found) {
      throw new Error(`Identity ${identityId} not found`)
    }
    if (found.provider === IdentityProvider.Discord) {
      throw new Error(`Cannot delete Discord identity`)
    }
    if (found.owner.identities.length === 1) {
      throw new Error(`Cannot delete last identity`)
    }
    const deleted = await this.core.data.identity.delete({ where: { id: identityId } })
    if (!deleted) {
      throw new Error(`Identity ${identityId} not deleted`)
    }
    return true
  }

  async refreshIdentity(userId: string, identityId: string) {
    const identity = await this.core.data.identity.findFirst({
      where: { id: identityId, ownerId: userId },
    })
    if (!identity) {
      throw new Error(`Identity ${identityId} not found`)
    }
    if (identity.provider !== IdentityProvider.Solana) {
      throw new Error(`Identity ${identityId} not supported`)
    }
    return this.networkAsset.sync.sync({ cluster: NetworkCluster.SolanaMainnet, identity })
  }

  async findManyIdentity(actor: User, input: UserFindManyIdentityInput): Promise<PrismaIdentity[]> {
    if (actor.role !== UserRole.Admin && actor.username !== input.username) {
      const user = await this.core.data.user.findUnique({ where: { username: input.username } })
      if (!user) {
        throw new Error(`User ${input.username} not found`)
      }
      if (user.private) {
        return []
      }
    }

    const items = await this.core.data.identity.findMany({
      where: { owner: { username: input.username }, provider: input.provider ?? undefined },
      orderBy: [{ provider: 'asc' }, { name: 'asc' }],
    })

    return items ?? []
  }

  async requestIdentityChallenge(
    ctx: BaseContext,
    userId: string,
    { provider, providerId }: RequestIdentityChallengeInput,
  ) {
    // Make sure the provider is allowed
    this.solana.ensureAllowedProvider(provider)

    // Make sure the provider is enabled
    if (!this.core.config.appConfig.authLinkProviders.includes(provider)) {
      throw new Error(`Provider ${provider} not enabled for linking`)
    }

    // Make sure the providerId is valid
    this.solana.ensureValidProviderId(provider, providerId)
    // Make sure the identity is owned by the user
    await this.solana.ensureIdentityOwner(userId, provider, providerId)

    // Get the IP and user agent from the request
    const { userAgent } = getRequestDetails(ctx)

    // Generate a random challenge
    const challenge = sha256(`${Math.random()}-${userAgent}-${userId}-${provider}-${providerId}-${Math.random()}`)

    const blockhash = await this.network.ensureBlockhash(NetworkCluster.SolanaMainnet)

    // Store the challenge
    return this.core.data.identityChallenge.create({
      data: {
        blockhash,
        identity: { connect: { provider_providerId: { provider, providerId } } },
        userAgent,
        challenge: `Approve this message to verify your wallet. #REF-${challenge}`,
      },
    })
  }

  async verifyIdentityChallenge(
    ctx: BaseContext,
    userId: string,
    { provider, providerId, challenge, message, signature }: VerifyIdentityChallengeInput,
  ) {
    // Make sure the provider is allowed
    this.solana.ensureAllowedProvider(provider)
    // Make sure the providerId is valid
    this.solana.ensureValidProviderId(provider, providerId)
    // Make sure the provider is enabled
    if (!this.core.config.appConfig.authLinkProviders.includes(provider)) {
      throw new Error(`Provider ${provider} not enabled for linking`)
    }
    // Make sure the identity is owned by the user
    await this.solana.ensureIdentityOwner(userId, provider, providerId)

    // Make sure we find the challenge
    const found = await this.solana.ensureIdentityChallenge(provider, providerId, challenge)

    const { userAgent } = getRequestDetails(ctx)

    if (found.userAgent !== userAgent) {
      throw new Error(`Identity challenge not found.`)
    }

    const verified = verifyMessageSignature({
      message,
      publicKey: found.identity.providerId,
      signature,
    })

    if (!verified) {
      throw new Error(`Identity challenge verification failed.`)
    }

    if (!found.identity.verified) {
      // Update the identity
      await this.core.data.identity.update({
        where: { id: found.identity.id },
        data: { verified: true },
      })
      this.logger.log(`Identity ${found.identity.id} verified`)
    }

    // Update the identity
    const updated = await this.core.data.identityChallenge.update({
      where: {
        id: found.id,
      },
      data: {
        verified,
        signature,
      },
    })
    await this.networkAsset.sync.sync({ cluster: NetworkCluster.SolanaMainnet, identity: found.identity })
    return updated
  }

  async linkIdentity(userId: string, { name, provider, providerId }: LinkIdentityInput) {
    // Make sure the provider is allowed
    this.solana.ensureAllowedProvider(provider)
    // Make sure the provider is enabled
    if (!this.core.config.appConfig.authLinkProviders.includes(provider)) {
      throw new Error(`Provider ${provider} not enabled for linking`)
    }
    // Make sure the identity does not exist
    const found = await this.findOneIdentity(provider, providerId)
    if (found) {
      throw new Error(`Identity ${provider} ${providerId} already linked`)
    }

    if (provider === IdentityProvider.Discord) {
      const existing = await this.core.data.identity.findFirst({ where: { provider, ownerId: userId } })
      if (existing) {
        throw new Error(`Discord identity already linked`)
      }
    }

    // Create the identity
    return this.core.data.identity.create({
      data: {
        name: name ?? providerId,
        ownerId: userId,
        provider,
        providerId,
      },
    })
  }

  findOneIdentity(provider: IdentityProvider, providerId: string) {
    return this.core.data.identity.findUnique({
      where: { provider_providerId: { provider, providerId } },
      include: { owner: true },
    })
  }

  async updateIdentity(userId: string, identityId: string, input: UserUpdateIdentityInput) {
    const found = await this.core.data.identity.findFirst({ where: { id: identityId, ownerId: userId } })

    if (!found) {
      throw new Error(`Identity ${identityId} not found`)
    }

    return this.core.data.identity.update({
      where: { id: identityId },
      data: { name: input.name?.length ? input.name : (found.profile as { name?: string })?.name ?? found.providerId },
    })
  }
}
