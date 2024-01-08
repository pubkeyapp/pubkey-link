import { useWallet } from '@solana/wallet-adapter-react'
import { useGetBalance } from '@pubkey-link/web-solana-data-access'
import { useCounterFetchAll } from './use-counter-fetch-all'

export function useCounterRefresh() {
  const { publicKey } = useWallet()

  const getBalance = useGetBalance({ address: publicKey! })
  const countersQuery = useCounterFetchAll()

  return async () => {
    await Promise.all([countersQuery.refetch(), getBalance.refetch()])
  }
}
