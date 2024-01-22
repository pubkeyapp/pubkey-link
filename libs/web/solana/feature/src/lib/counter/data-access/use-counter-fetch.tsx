import { toastError } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { useCounterProgram } from './use-counter-program'
import { PublicKey } from '@solana/web3.js'

export function useCounterFetch({ account }: { account: PublicKey }) {
  const program = useCounterProgram()

  return useQuery({
    queryKey: ['counter', 'fetch', { account }],
    queryFn: () => program.account.counter.fetch(account).catch((err) => toastError(err.message)),
  })
}
