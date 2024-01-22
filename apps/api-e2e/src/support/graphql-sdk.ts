import { getGraphQLSdk, IdentityProvider, Sdk } from '@pubkey-link/sdk'
import { Keypair } from '@solana/web3.js'
import * as nacl from 'tweetnacl'
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
        providerId: user.solana.publicKey,
      },
    },
    { cookie },
  )
}

export function getUserKeypair(user: TestUser): Keypair {
  return Keypair.fromSecretKey(Uint8Array.from(user.solana.secret))
}

export function signMessage(user: TestUser, message: string) {
  return nacl.sign.detached(new TextEncoder().encode(message), Uint8Array.from(user.solana.secret))
}
