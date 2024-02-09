import { Injectable, Logger } from '@nestjs/common'
import { Identity as PrismaIdentity, IdentityProvider } from '@prisma/client'
import { ApiCoreService, BaseContext, getRequestDetails } from '@pubkey-link/api-core-data-access'
import { ApiNetworkAssetService } from '@pubkey-link/api-network-asset-data-access'
import { verifySignature } from '@pubkeyapp/solana-verify-wallet'
import { ApiSolanaIdentityService } from './api-solana-identity.service'
import { LinkIdentityInput } from './dto/link-identity-input'
import { RequestIdentityChallengeInput } from './dto/request-identity-challenge.input'
import { UserFindManyIdentityInput } from './dto/user-find-many-identity-input'
import { VerifyIdentityChallengeInput } from './dto/verify-identity-challenge-input'
import { sha256 } from './helpers/sha256'

@Injectable()
export class ApiUserIdentityService {
  private readonly logger = new Logger(ApiUserIdentityService.name)
  constructor(
    private readonly core: ApiCoreService,
    private readonly solana: ApiSolanaIdentityService,
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
    if (found.owner.identities.length === 1 && !found.owner.password) {
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
    return this.networkAsset.sync.sync(identity)
  }

  async findManyIdentity(input: UserFindManyIdentityInput): Promise<PrismaIdentity[]> {
    const items = await this.core.data.identity.findMany({
      where: { owner: { username: input.username } },
      orderBy: [{ provider: 'asc' }, { providerId: 'asc' }],
    })

    return items ?? []
  }

  async requestIdentityChallenge(
    ctx: BaseContext,
    userId: string,
    { provider, providerId }: RequestIdentityChallengeInput,
  ) {
    // Make sure we can link the given provider
    this.solana.ensureLinkProvider(provider)

    // Make sure the provider is enabled
    if (!this.core.config.appConfig.authLinkProviders.includes(provider)) {
      throw new Error(`Provider ${provider} not enabled for linking`)
    }

    // Make sure the providerId is valid
    this.solana.ensureValidProviderId(provider, providerId)
    // Make sure the identity is owned by the user
    await this.solana.ensureIdentityOwner(userId, provider, providerId)

    // Get the IP and user agent from the request
    const { ip, userAgent } = getRequestDetails(ctx)

    // Generate a random challenge
    const challenge = sha256(`${Math.random()}-${ip}-${userAgent}-${userId}-${provider}-${providerId}-${Math.random()}`)

    // Store the challenge
    return this.core.data.identityChallenge.create({
      data: {
        identity: { connect: { provider_providerId: { provider, providerId } } },
        ip,
        userAgent,
        challenge: `Approve this message to verify your wallet. #REF-${challenge}`,
      },
    })
  }

  async verifyIdentityChallenge(
    ctx: BaseContext,
    userId: string,
    { provider, providerId, challenge, signature, useLedger }: VerifyIdentityChallengeInput,
  ) {
    // Make sure we can link the given provider
    this.solana.ensureLinkProvider(provider)
    // Make sure the providerId is valid
    this.solana.ensureValidProviderId(provider, providerId)
    // Make sure the identity is owned by the user
    await this.solana.ensureIdentityOwner(userId, provider, providerId)

    // Make sure we find the challenge
    const found = await this.solana.ensureIdentityChallenge(provider, providerId, challenge)

    const { ip, userAgent } = getRequestDetails(ctx)

    if (found.ip !== ip || found.userAgent !== userAgent) {
      throw new Error(`Identity challenge not found.`)
    }

    const verified = verifySignature({
      challenge: found.challenge,
      publicKey: found.identity.providerId,
      signature,
      useLedger,
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
    return updated
  }

  async linkIdentity(userId: string, { provider, providerId }: LinkIdentityInput) {
    // Make sure we can link the given provider
    this.solana.ensureLinkProvider(provider)
    // Make sure the identity does not exist
    const found = await this.core.data.identity.findFirst({
      where: {
        provider,
        providerId,
      },
    })
    if (found) {
      throw new Error(`Identity ${provider} ${providerId} already linked`)
    }

    // Create the identity
    const created = await this.core.data.identity.create({
      data: {
        provider,
        providerId,
        ownerId: userId,
      },
    })
    return created
  }

  findOneIdentity(provider: IdentityProvider, providerId: string) {
    return this.core.data.identity.findUnique({
      where: { provider_providerId: { provider, providerId } },
      include: { owner: true },
    })
  }
}
