import { useAnchorWallet, useWallet } from '@solana/wallet-adapter-react'
import { CreateSignature, createSignature } from './create-signature'

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
