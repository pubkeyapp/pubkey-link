import { CacheStatus, NetworkCluster } from '@pubkey-link/sdk'
import { UiCard, UiInfoTable } from '@pubkey-ui/core'
import { CacheUiGroup } from './cache-ui-group'

export function CacheUiStatus({
  status,
  resolve,
}: {
  status: CacheStatus
  resolve: (cluster: NetworkCluster, resolverId: string) => Promise<void>
}) {
  return (
    <UiCard title="Cache Status">
      <UiInfoTable
        items={[
          ['Enabled', status.enabled ? 'Yes' : 'No'],
          ['REST Enabled', status.restEnabled ? 'Yes' : 'No'],
        ]}
      />
      {status?.caches?.map((group) => (
        <CacheUiGroup key={group.cluster} group={group} resolve={(resolverId) => resolve(group.cluster, resolverId)} />
      ))}
    </UiCard>
  )
}
