import { CreateSignature, createSignature } from '@pubkeyapp/solana-verify-wallet'
import { useAnchorWallet, useConnection, useWallet } from '@solana/wallet-adapter-react'

export function useCreateSignature() {
  const wallet = useAnchorWallet()
  const { connection } = useConnection()
  const { signMessage } = useWallet()

  return async function ({
    challenge,
    publicKey,
    useLedger,
  }: Omit<CreateSignature, 'connection' | 'signMessage' | 'wallet'>) {
    return createSignature({
      challenge,
      connection,
      publicKey,
      signMessage,
      signTransaction: wallet?.signTransaction,
      useLedger,
    })
  }
}
