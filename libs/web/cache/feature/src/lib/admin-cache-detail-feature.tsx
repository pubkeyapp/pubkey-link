import { Text } from '@mantine/core'
import { NetworkCluster } from '@pubkey-link/sdk'
import { useAdminCacheDetail } from '@pubkey-link/web-cache-data-access'
import { UiBack, UiDebug, UiLoader, UiPage } from '@pubkey-ui/core'
import { useParams } from 'react-router-dom'

export function AdminCacheDetailFeature() {
  const { cacheId, cluster } = useParams<{ cacheId: string; cluster: NetworkCluster }>() as {
    cacheId: string
    cluster: NetworkCluster
  }
  const { isLoading, data } = useAdminCacheDetail({ cacheId, cluster })

  return (
    <UiPage title={`Cache ${cluster}`} leftAction={<UiBack />}>
      <Text c="dimmed" ff="monospace" span>
        {cacheId}
      </Text>
      {isLoading ? <UiLoader /> : data ? <UiDebug data={data} open /> : <div>Error loading cache</div>}
    </UiPage>
  )
}
