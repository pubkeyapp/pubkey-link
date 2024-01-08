import { IdentityProvider } from '@pubkey-link/sdk'
import { useSdk } from '@pubkey-link/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useWallet } from '@solana/wallet-adapter-react'
import { createContext, ReactNode, useContext } from 'react'
import { useCreateSignature } from './use-create-signature'

export interface LinkSignOptions {
  useLedger: boolean
  publicKey: string
}
export interface IdentityProviderSolanaContext {
  linkAndSign: (input: LinkSignOptions) => Promise<boolean>
  verifyAndSign: (input: LinkSignOptions) => Promise<boolean>
}

const Context = createContext<IdentityProviderSolanaContext>({} as IdentityProviderSolanaContext)

export function IdentityProviderSolanaLink({ children, refresh }: { children: ReactNode; refresh: () => void }) {
  const sdk = useSdk()
  const { signMessage } = useWallet()
  const createSignature = useCreateSignature()
  async function linkIdentity({ publicKey }: { publicKey: string }) {
    return sdk
      .userLinkIdentity({ input: { provider: IdentityProvider.Solana, providerId: publicKey } })
      .then((res) => {
        toastSuccess('Identity linked')
        refresh()
      })
      .catch((err) => {
        console.log('Error linking identity', err)
        toastError('Error linking identity')
      })
  }

  async function requestChallenge({ publicKey }: { publicKey: string }) {
    return sdk
      .userRequestIdentityChallenge({ input: { provider: IdentityProvider.Solana, providerId: publicKey } })
      .then((res) => {
        if (!res.data.challenge) {
          toastError('Error linking identity')
          return
        }
        return res.data.challenge
      })
      .catch((err) => {
        console.log('error linking identity', err)
        toastError('Error linking identity')
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
      .userVerifyIdentityChallenge({
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

  async function linkAndSign({ useLedger, publicKey }: LinkSignOptions) {
    // Link identity
    await linkIdentity({ publicKey })
    // Verify and sign
    return verifyAndSign({ useLedger, publicKey })
  }

  return <Context.Provider value={{ linkAndSign, verifyAndSign }}>{children}</Context.Provider>
}

export function useIdentitySolana() {
  return useContext(Context)
}
