import { useSdk } from '@pubkey-link/web-core-data-access'
import { useQuery } from '@tanstack/react-query'

export function useAdminFindOneSnapshot({ snapshotId }: { snapshotId: string }) {
  const sdk = useSdk()
  const query = useQuery({
    queryKey: ['admin', 'find-one-snapshot', snapshotId],
    queryFn: () => sdk.adminFindOneSnapshot({ snapshotId }).then((res) => res.data),
    retry: 0,
  })
  const item = query.data?.item ?? undefined

  return {
    item,
    query,
  }
}
