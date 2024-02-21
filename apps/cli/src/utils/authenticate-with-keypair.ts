import { IdentityProvider, Sdk } from '@pubkey-link/sdk'
import { Keypair } from '@solana/web3.js'
import * as bs58 from 'bs58'
import * as nacl from 'tweetnacl'

export function signMessage(keypair: Keypair, message: string) {
  return nacl.sign.detached(new TextEncoder().encode(message), keypair.secretKey)
}

export async function authenticateWithKeypair(sdk: Sdk, keypair: Keypair) {
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

async function verifyIdentityChallenge(sdk: Sdk, keypair: Keypair, challenge: string) {
  const signature = signMessage(keypair, challenge)

  const req = await sdk.anonVerifyIdentityChallenge(
    {
      input: {
        provider: IdentityProvider.Solana,
        providerId: keypair.publicKey.toString(),
        challenge,
        signature: bs58.encode(signature),
      },
    },
    {},
  )

  return req.headers.get('set-cookie')
}
