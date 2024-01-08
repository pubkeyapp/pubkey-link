import { useCluster } from '@pubkey-link/web-solana-data-access'
import { toastError } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { useCounterProgram } from './use-counter-program'

export function useCounterFetchAll() {
  const { cluster } = useCluster()
  const program = useCounterProgram()

  return useQuery({
    queryKey: ['counter', 'fetch-all', { cluster }],
    queryFn: () => program.account.counter.all().catch((err) => toastError(err.message)),
  })
}
