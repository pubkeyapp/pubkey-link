import { Keypair } from '@solana/web3.js'
import * as bs58 from 'bs58'
import * as nacl from 'tweetnacl'
import { IdentityProvider, Sdk } from '../generated/graphql-sdk'

export function signWithKeypair({ keypair, message }: { keypair: Keypair; message: string }) {
  const encoded = new TextEncoder().encode(message)
  const signature = nacl.sign.detached(encoded, keypair.secretKey)

  return { message: bs58.encode(encoded), signature: bs58.encode(signature) }
}

export async function authenticateWithKeypair({
  keypair,
  sdk,
}: {
  keypair: Keypair
  sdk: Sdk
}): Promise<{ cookie: string }> {
  return (
    // Get the challenge
    getIdentityChallenge(sdk, keypair)
      // Verify the challenge
      .then((challenge) => verifyIdentityChallenge(sdk, keypair, challenge))
  )
}

async function getIdentityChallenge(sdk: Sdk, keypair: Keypair) {
  const req = await sdk.anonRequestIdentityChallenge(
    {
      input: { provider: IdentityProvider.Solana, providerId: keypair.publicKey.toBase58() },
    },
    {},
  )
  if (!req.data?.challenge?.challenge) {
    throw new Error('No challenge')
  }
  return req.data.challenge.challenge
}

async function verifyIdentityChallenge(sdk: Sdk, keypair: Keypair, challenge: string): Promise<{ cookie: string }> {
  const { message, signature } = signWithKeypair({ keypair, message: challenge })

  const req = await sdk.anonVerifyIdentityChallenge(
    {
      input: {
        provider: IdentityProvider.Solana,
        providerId: keypair.publicKey.toString(),
        challenge,
        message,
        signature,
      },
    },
    {},
  )

  return { cookie: req.headers.get('set-cookie') ?? '' }
}
