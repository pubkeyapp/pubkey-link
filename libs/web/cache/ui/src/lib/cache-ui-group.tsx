import { CacheGroup } from '@pubkey-link/sdk'
import { UiCard, UiStack } from '@pubkey-ui/core'
import { CacheUiResolverList } from './cache-ui-resolver-list'

export function CacheUiGroup({
  group,
  sync,
  resolve,
}: {
  group: CacheGroup
  sync: (resolverId: string) => Promise<void>
  resolve: (resolverId: string) => Promise<void>
}) {
  return (
    <UiCard title={`${group.cluster} - Resolvers:`}>
      <UiStack>
        <CacheUiResolverList cluster={group.cluster} sync={sync} resolvers={group.resolvers ?? []} resolve={resolve} />
      </UiStack>
    </UiCard>
  )
}
