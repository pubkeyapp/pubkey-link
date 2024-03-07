import { getGraphQLSdk, IdentityProvider, Sdk } from '@pubkey-link/sdk'
import { signWithKeypair } from '@pubkey-link/verify-wallet'
import { getApiUrl } from './get-api.url'
import { alice, bob, TestUser } from './user-identities'

export const sdk: Sdk = getGraphQLSdk(getApiUrl('/graphql'))

async function getUserCookie(user: TestUser) {
  const res = await sdk.login({
    input: { username: user.username, password: user.password },
  })

  return res.headers.get('set-cookie')
}

export async function getAliceCookie() {
  return getUserCookie(alice)
}
export async function getBobCookie() {
  return getUserCookie(bob)
}

export async function getIdentityChallenge(user: TestUser) {
  const cookie = await getUserCookie(user)
  return sdk.userRequestIdentityChallenge(
    {
      input: {
        provider: IdentityProvider.Solana,
        providerId: user.solana.publicKey.toString(),
      },
    },
    { cookie },
  )
}

export function signMessage(user: TestUser, message: string) {
  return signWithKeypair({ keypair: user.solana, message })
}
