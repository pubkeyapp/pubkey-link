import { IdentityProvider } from '@pubkey-link/sdk'
import { useSdk } from '@pubkey-link/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useWallet } from '@solana/wallet-adapter-react'
import { createContext, ReactNode, useContext } from 'react'
import { LinkSignOptions } from './identity-provider-solana-link'
import { useCreateSignature } from './use-create-signature'

export interface IdentityProviderSolanaLoginContext {
  verifyAndSign: (input: LinkSignOptions) => Promise<boolean>
}

const Context = createContext<IdentityProviderSolanaLoginContext>({} as IdentityProviderSolanaLoginContext)

export function IdentityProviderSolanaLogin({ children, refresh }: { children: ReactNode; refresh: () => void }) {
  const sdk = useSdk()
  const { signMessage } = useWallet()
  const createSignature = useCreateSignature()

  async function requestChallenge({ publicKey }: { publicKey: string }) {
    return sdk
      .anonRequestIdentityChallenge({ input: { provider: IdentityProvider.Solana, providerId: publicKey } })
      .then((res) => {
        if (!res.data.challenge) {
          toastError('Error requesting challenge')
          return
        }
        return res.data.challenge
      })
      .catch((err) => {
        console.log('error requesting challenge', err)
        toastError('Error requesting challenge')
      })
  }

  async function signChallenge({ challenge, publicKey, useLedger }: LinkSignOptions & { challenge: string }) {
    if (!challenge || signMessage === undefined) {
      return false
    }

    const signature = await createSignature({ challenge, publicKey, useLedger })
    if (!signature) {
      throw new Error('No signature')
    }

    return sdk
      .anonVerifyIdentityChallenge({
        input: {
          provider: IdentityProvider.Solana,
          providerId: publicKey,
          challenge: challenge,
          signature,
          useLedger,
        },
      })
      .then((res) => {
        toastSuccess('Identity verified')
        refresh()
        return !!res.data.verified
      })
      .catch((err) => {
        console.log('error verifying identity', err)
        toastError('Error verifying identity')
        return false
      })
  }

  async function verifyAndSign({ useLedger, publicKey }: LinkSignOptions) {
    // Request challenge
    const request = await requestChallenge({ publicKey })
    if (!request?.challenge) {
      return false
    }
    // Sign challenge
    return signChallenge({ challenge: request.challenge, publicKey, useLedger })
  }

  return <Context.Provider value={{ verifyAndSign }}>{children}</Context.Provider>
}

export function useIdentitySolanaLogin() {
  return useContext(Context)
}
