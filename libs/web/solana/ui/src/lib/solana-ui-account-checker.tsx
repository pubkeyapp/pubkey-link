import { useWallet } from '@solana/wallet-adapter-react'
import { SolanaUiAccountBalanceCheck } from './solana-ui-account-balance-check'

export function SolanaUiAccountChecker() {
  const { publicKey } = useWallet()
  if (!publicKey) {
    return null
  }
  return <SolanaUiAccountBalanceCheck address={publicKey} />
}
