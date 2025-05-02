import { Button, Container, Group, Stack, Text } from '@mantine/core'
import { NetworkCluster } from '@pubkey-link/sdk'
import { useAdminCacheDetail, useAdminCacheResolve } from '@pubkey-link/web-cache-data-access'
import { CacheUiRenderData } from '@pubkey-link/web-cache-ui'
import { UiBack, UiDebugModal, UiLoader, UiTime } from '@pubkey-ui/core'
import React from 'react'
import { useParams } from 'react-router-dom'

export function AdminCacheDetailFeature() {
  const { cacheId, cluster } = useParams<{ cacheId: string; cluster: NetworkCluster }>() as {
    cacheId: string
    cluster: NetworkCluster
  }
  const { isLoading, data, refetch } = useAdminCacheDetail({ cacheId, cluster })
  const resolveMutation = useAdminCacheResolve()

  async function resolve() {
    await resolveMutation.mutateAsync({ cluster, resolverId: cacheId })
    await refetch()
  }

  return (
    <Container fluid>
      <Stack>
        <Group justify="space-between">
          <Group>
            <UiBack />
            <Text size="xl">Cache {cluster}</Text>
          </Group>
          <Group>
            <Button size="xs" variant="light" onClick={resolve}>
              Resolve
            </Button>
            <UiDebugModal data={data} />
          </Group>
        </Group>
        <Group justify="space-between">
          <Text c="dimmed" ff="monospace" span>
            {cacheId}
          </Text>
          {data?.cachedAt ? <UiTime prefix="Cached " date={new Date(data?.cachedAt ?? 0)} /> : null}
        </Group>
        {isLoading ? <UiLoader /> : <CacheUiRenderData data={data} />}
      </Stack>
    </Container>
  )
}
