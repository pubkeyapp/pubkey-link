import { useAdminCacheResolve, useAdminCacheStatus } from '@pubkey-link/web-cache-data-access'
import { CacheUiStatus } from '@pubkey-link/web-cache-ui'
import { UiLoader, UiPage } from '@pubkey-ui/core'

export function AdminCacheStatusFeature() {
  const { isLoading, data } = useAdminCacheStatus()
  const resolveMutation = useAdminCacheResolve()

  return (
    <UiPage title="Cache">
      {isLoading ? (
        <UiLoader />
      ) : data ? (
        <CacheUiStatus
          status={data}
          resolve={async (cluster, resolverId) => {
            await resolveMutation.mutateAsync({ cluster, resolverId })
          }}
        />
      ) : (
        <div>No status</div>
      )}
    </UiPage>
  )
}
