import { IdentityProvider, Sdk } from '@pubkey-link/sdk'
import { signWithKeypair } from '@pubkey-link/verify-wallet'
import { Keypair } from '@solana/web3.js'

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

  return req.headers.get('set-cookie')
}
