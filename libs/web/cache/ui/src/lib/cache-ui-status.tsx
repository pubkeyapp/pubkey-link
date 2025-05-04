import { CacheStatus, NetworkCluster } from '@pubkey-link/sdk'
import { UiInfo, UiStack } from '@pubkey-ui/core'
import { CacheUiGroup } from './cache-ui-group'

export function CacheUiStatus({
  status,
  sync,
  resolve,
}: {
  status: CacheStatus
  sync: (cluster: NetworkCluster, resolverId: string) => Promise<void>
  resolve: (cluster: NetworkCluster, resolverId: string) => Promise<void>
}) {
  if (!status.caches?.length) {
    return <UiInfo message="No caches found." />
  }
  return (
    <UiStack>
      {status?.caches?.map((group) => (
        <CacheUiGroup
          key={group.cluster}
          group={group}
          sync={(resolverId) => sync(group.cluster, resolverId)}
          resolve={(resolverId) => resolve(group.cluster, resolverId)}
        />
      ))}
    </UiStack>
  )
}
