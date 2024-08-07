import { useQuery } from '@tanstack/react-query'
import { useSdk } from './sdk-provider'

export function useAdminTableStats() {
  const sdk = useSdk()
  const query = useQuery({
    queryKey: ['admin', 'table-stats'],
    queryFn: () => sdk.adminTableStats().then((res) => res.data),
  })

  return { items: query.data?.items ?? [], isLoading: query.isLoading }
}
