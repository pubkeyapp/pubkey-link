import { authenticateWithKeypair, getGraphQLSdk, IdentityProvider, Sdk, User } from '@pubkey-link/sdk'
import { signWithKeypair } from '@pubkey-link/verify-wallet'
import { Keypair } from '@solana/web3.js'
import { alice, bob, TestUser } from '../fixtures/test-users'
import { getApiUrl } from './get-api.url'

export const sdk: Sdk = getGraphQLSdk(getApiUrl('/graphql'))

export type UserCookie = { cookie: string; user: User }

const cookieJar = new Map<TestUser, UserCookie>()

export async function getUserCookie(testUser: TestUser): Promise<UserCookie> {
  if (!cookieJar.has(testUser)) {
    const { cookie } = await authenticateWithKeypair({ sdk, keypair: testUser.solana })

    if (!cookie) {
      throw new Error('No cookie set')
    }
    const user = await sdk.me({}, { cookie }).then((res) => res.data.me)

    cookieJar.set(testUser, { cookie, user })
  }
  return cookieJar.get(testUser)
}

export async function getAliceCookie() {
  return getUserCookie(alice).then((res) => res.cookie)
}
export async function getBobCookie() {
  return getUserCookie(bob).then((res) => res.cookie)
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

export async function authenticate({ keypair }: { keypair: Keypair }): Promise<UserCookie> {
  const { cookie } = await authenticateWithKeypair({ sdk, keypair })
  const user = await sdk.me({}, { cookie }).then((res) => res.data.me)

  return { user, cookie }
}
