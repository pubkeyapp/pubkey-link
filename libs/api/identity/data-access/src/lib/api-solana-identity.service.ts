import { Injectable, Logger } from '@nestjs/common'
import { IdentityProvider } from '@prisma/client'
import { ApiCoreService, BaseContext, getRequestDetails } from '@pubkey-link/api-core-data-access'
import { PublicKey } from '@solana/web3.js'
import { verifySignature } from '@pubkeyapp/solana-verify-wallet'

@Injectable()
export class ApiSolanaIdentityService {
  private readonly logger = new Logger(ApiSolanaIdentityService.name)
  constructor(private readonly core: ApiCoreService) {}

  ensureLinkProvider(provider: IdentityProvider) {
    if (provider !== IdentityProvider.Solana) {
      throw new Error(`Identity provider ${provider} not supported`)
    }
  }

  ensureValidProviderId(provider: IdentityProvider, providerId: string) {
    if (provider === IdentityProvider.Solana) {
      verifyValidPublicKey(providerId)
    }
  }

  async ensureValidSignature(
    ctx: BaseContext,
    provider: IdentityProvider,
    providerId: string,
    challenge: string,
    signature: string,
    useLedger: boolean,
  ) {
    // Make sure we find the challenge
    const found = await this.ensureIdentityChallenge(provider, providerId, challenge)

    // Make sure the IP and user agent match the challenge
    const { ip, userAgent } = getRequestDetails(ctx)

    if (found.ip !== ip || found.userAgent !== userAgent) {
      throw new Error(`Identity challenge not found.`)
    }

    // Verify the signature
    const verified = verifySignature({
      challenge: found.challenge,
      publicKey: found.identity.providerId,
      signature,
      useLedger,
    })

    if (!verified) {
      throw new Error(`Identity challenge verification failed.`)
    }

    return { found, verified }
  }

  async ensureIdentityChallenge(provider: IdentityProvider, providerId: string, challenge: string) {
    // Make sure we find the challenge
    const found = await this.core.data.identityChallenge.findFirst({
      where: {
        provider,
        providerId,
        challenge,
      },
      include: {
        identity: true,
      },
    })
    if (!found) {
      throw new Error(`Identity challenge not found.`)
    }
    return found
  }

  async ensureIdentityOwner(ownerId: string, provider: IdentityProvider, providerId: string) {
    const found = await this.core.data.identity.findFirst({
      where: {
        ownerId,
        provider,
        providerId,
      },
    })
    if (!found) {
      throw new Error(`Identity ${provider} ${providerId} not found`)
    }
    return found
  }
  async findIdentity(provider: IdentityProvider, providerId: string) {
    return this.core.data.identity.findFirst({
      where: {
        provider,
        providerId,
      },
      include: { owner: true },
    })
  }
}

export function verifyValidPublicKey(address: string) {
  try {
    new PublicKey(address)
  } catch (error) {
    throw new Error(`Invalid Solana public key.`)
  }
}
