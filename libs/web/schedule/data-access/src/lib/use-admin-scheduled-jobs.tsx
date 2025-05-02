import { useSdk } from '@pubkey-link/web-core-data-access'
import { useQuery } from '@tanstack/react-query'

export function useAdminScheduledJobs() {
  const sdk = useSdk()

  return useQuery({
    queryKey: ['admin-scheduled-jobs'],
    queryFn: async () => {
      return await sdk.adminScheduledJobs().then((res) => res?.data?.items ?? [])
    },
  })
}
