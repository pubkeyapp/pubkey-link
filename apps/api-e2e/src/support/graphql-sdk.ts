import { authenticateWithKeypair, getGraphQLSdk, IdentityProvider, Sdk } from '@pubkey-link/sdk'
import { signWithKeypair } from '@pubkey-link/verify-wallet'
import { alice, bob, TestUser } from '../fixtures/test-users'
import { getApiUrl } from './get-api.url'

export const sdk: Sdk = getGraphQLSdk(getApiUrl('/graphql'))

const cookieJar = new Map<TestUser, string>()

async function getUserCookie(user: TestUser) {
  if (!cookieJar.has(user)) {
    const { cookie } = await authenticateWithKeypair({ sdk, keypair: user.solana })

    if (!cookie) {
      throw new Error('No cookie set')
    }
    cookieJar.set(user, cookie)
  }
  return cookieJar.get(user)
}

export async function getAliceCookie() {
  return getUserCookie(alice)
}
export async function getBobCookie() {
  return getUserCookie(bob)
}

export async function getIdentityChallenge(user: TestUser) {
  return sdk.anonRequestIdentityChallenge({
    input: {
      provider: IdentityProvider.Solana,
      providerId: user.solana.publicKey.toString(),
    },
  })
}

export function signMessage(user: TestUser, message: string) {
  return signWithKeypair({ keypair: user.solana, message })
}
