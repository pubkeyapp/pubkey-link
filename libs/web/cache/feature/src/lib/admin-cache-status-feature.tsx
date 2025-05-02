import { Button } from '@mantine/core'
import { CacheStatus } from '@pubkey-link/sdk'
import { useAdminCacheResolve, useAdminCacheStatus } from '@pubkey-link/web-cache-data-access'
import { CacheUiStatus } from '@pubkey-link/web-cache-ui'
import { UiBack, UiLoader, UiPage } from '@pubkey-ui/core'
import { Link } from 'react-router-dom'

export function AdminCacheStatusFeature() {
  const { isLoading, data } = useAdminCacheStatus()
  const resolveMutation = useAdminCacheResolve()

  const status: CacheStatus | undefined = data ?? undefined
  return (
    <UiPage
      title="Cache"
      leftAction={<UiBack />}
      rightAction={
        <Button component={Link} to="./config" size="xs" variant="light">
          Config
        </Button>
      }
    >
      {isLoading ? (
        <UiLoader />
      ) : status ? (
        <CacheUiStatus
          status={status}
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
