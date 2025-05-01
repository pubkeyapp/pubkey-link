import { Anchor, Button, Group } from '@mantine/core'
import { CacheResolver, NetworkCluster } from '@pubkey-link/sdk'
import { UiDebugModal, UiStack } from '@pubkey-ui/core'
import { Link } from 'react-router-dom'

export function CacheUiResolverItem({
  cluster,
  resolver,
  resolve,
}: {
  cluster: NetworkCluster
  resolver: CacheResolver
  resolve: () => Promise<void>
}) {
  return (
    <UiStack>
      <Group justify="space-between">
        <Group>
          <Anchor component={Link} to={`${cluster}/${resolver.id}`} ff="monospace">
            {resolver.id}
          </Anchor>
        </Group>
        <Group>
          <Button size="xs" variant="light" onClick={resolve}>
            Resolve
          </Button>
          <UiDebugModal data={resolver} />
        </Group>
      </Group>
    </UiStack>
  )
}
