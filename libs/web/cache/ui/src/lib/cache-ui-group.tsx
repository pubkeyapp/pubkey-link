import { CacheGroup } from '@pubkey-link/sdk'
import { UiCard, UiStack } from '@pubkey-ui/core'
import { CacheUiResolverList } from './cache-ui-resolver-list'

export function CacheUiGroup({
  group,
  resolve,
}: {
  group: CacheGroup
  resolve: (resolverId: string) => Promise<void>
}) {
  return (
    <UiCard title={`${group.cluster} - Resolvers:`}>
      <UiStack>
        <CacheUiResolverList cluster={group.cluster} resolvers={group.resolvers ?? []} resolve={resolve} />
      </UiStack>
    </UiCard>
  )
}
