import {
  AspectRatio,
  Box,
  Button,
  Container,
  Group,
  Image,
  Popover,
  SimpleGrid,
  Slider,
  Stack,
  Text,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { NetworkCluster } from '@pubkey-link/sdk'
import { useAdminCacheDetail, useAdminCacheResolve } from '@pubkey-link/web-cache-data-access'
import { UiBack, UiDebug, UiDebugModal, UiLoader, UiStack } from '@pubkey-ui/core'
import { DAS } from 'helius-sdk'
import React from 'react'
import { useParams } from 'react-router-dom'

export function AdminCacheDetailFeature() {
  const { cacheId, cluster } = useParams<{ cacheId: string; cluster: NetworkCluster }>() as {
    cacheId: string
    cluster: NetworkCluster
  }
  const { isLoading, data } = useAdminCacheDetail({ cacheId, cluster })
  const resolveMutation = useAdminCacheResolve()

  async function resolve() {
    await resolveMutation.mutateAsync({ cluster, resolverId: cacheId })
  }

  return (
    <Container fluid>
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
      <Text c="dimmed" ff="monospace" span>
        {cacheId}
      </Text>
      {isLoading ? (
        <UiLoader />
      ) : data ? (
        <UiStack>
          {data.type === 'helius-collection-assets' ? (
            <CacheUiAssetGrid items={data.items} />
          ) : (
            <UiDebug data={data} open />
          )}
        </UiStack>
      ) : (
        <div>Error loading cache</div>
      )}
    </Container>
  )
}

const marks = Array.from({ length: 11 }, (_, index) => ({
  value: index * 4,
  label: `${index + 1}`,
}))

export function CacheUiAssetGrid({ items }: { items: DAS.GetAssetResponse[] }) {
  const [cols, setCols] = React.useState(marks[1].value)
  return (
    <Stack>
      <Group justify="flex-end">
        <Slider
          w={200}
          defaultValue={cols}
          step={4}
          max={marks[marks.length - 1].value}
          min={marks[0].value}
          marks={marks}
          styles={{ markLabel: { display: 'none' } }}
          value={cols}
          onChange={(val) => setCols(val)}
        />
      </Group>
      <SimpleGrid cols={cols} spacing="xs">
        {items.map((item: DAS.GetAssetResponse) => (
          <CacheUiAssetGridItem key={item.id} item={item} />
        ))}
      </SimpleGrid>
    </Stack>
  )
}
export function CacheUiAssetGridItem({ item }: { item: DAS.GetAssetResponse }) {
  const [opened, { close, open }] = useDisclosure(false)

  const items = item.content?.metadata?.attributes?.map((stat) => (
    <div key={stat.trait_type}>
      <Text size="xs" c="dimmed">
        {stat.trait_type}
      </Text>
      <Text fw={500} size="sm">
        {stat.value}
      </Text>
    </div>
  ))

  if (!item.content?.files?.length) {
    return null
  }

  return (
    <Popover width={300} position="right" withArrow shadow="md" opened={opened}>
      <Popover.Target>
        <Box onMouseEnter={open} onMouseLeave={close}>
          <AspectRatio ratio={1}>
            {item?.content?.files[0].uri ? <Image src={item.content.files[0].uri} alt="Running challenge" /> : null}
          </AspectRatio>
        </Box>
      </Popover.Target>
      <Popover.Dropdown style={{ pointerEvents: 'none' }} p={0}>
        <AspectRatio ratio={1}>
          {item?.content?.files[0].uri ? <Image src={item.content.files[0].uri} alt="Running challenge" /> : null}
        </AspectRatio>
        <Group justify="space-between" mt="xs" px="md">
          <Text fz="sm" fw={700}>
            {item.content?.metadata?.name}
          </Text>
        </Group>
        <SimpleGrid cols={2} p="md">
          {items}
        </SimpleGrid>
      </Popover.Dropdown>
    </Popover>
  )
}
