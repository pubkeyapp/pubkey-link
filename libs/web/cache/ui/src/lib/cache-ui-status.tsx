import { CacheStatus, NetworkCluster } from '@pubkey-link/sdk'
import { UiStack } from '@pubkey-ui/core'
import { CacheUiGroup } from './cache-ui-group'

export function CacheUiStatus({
  status,
  resolve,
}: {
  status: CacheStatus
  resolve: (cluster: NetworkCluster, resolverId: string) => Promise<void>
}) {
  return (
    <UiStack>
      {status?.caches?.map((group) => (
        <CacheUiGroup key={group.cluster} group={group} resolve={(resolverId) => resolve(group.cluster, resolverId)} />
      ))}
    </UiStack>
  )
}
