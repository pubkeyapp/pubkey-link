import { CreateSignature, createSignature } from '@pubkey-link/verify-wallet'
import { useAnchorWallet, useWallet } from '@solana/wallet-adapter-react'

export function useCreateSignature() {
  const wallet = useAnchorWallet()
  const { signMessage } = useWallet()

  return async function ({
    challenge,
    publicKey,
    useLedger,
    blockhash,
  }: Omit<CreateSignature, 'signMessage' | 'wallet'>) {
    return createSignature({
      challenge,
      blockhash,
      publicKey,
      signMessage,
      signTransaction: wallet?.signTransaction,
      useLedger,
    })
  }
}
