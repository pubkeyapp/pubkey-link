import { AspectRatio, Box, Group, Image, Popover, SimpleGrid, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { CollectionAsset } from '@pubkey-link/sdk'
import React from 'react'

export function CollectionUiAssetGridItem({ asset }: { asset: CollectionAsset }) {
  const [opened, { close, open }] = useDisclosure(false)

  const items = asset?.attributes?.map((stat) => (
    <div key={stat.key}>
      <Text size="xs" c="dimmed">
        {stat.key}
      </Text>
      <Text fw={500} size="sm">
        {stat.value}
      </Text>
    </div>
  ))

  if (!asset.imageUrl) {
    return null
  }

  return (
    <Popover width={300} position="right" withArrow shadow="md" opened={opened}>
      <Popover.Target>
        <Box onMouseEnter={open} onMouseLeave={close}>
          <AspectRatio ratio={1}>
            <Image src={asset.imageUrl} />
          </AspectRatio>
        </Box>
      </Popover.Target>
      <Popover.Dropdown style={{ pointerEvents: 'none' }} p={0}>
        <AspectRatio ratio={1}>
          <Image src={asset.imageUrl} radius="xs" />
        </AspectRatio>
        <Group justify="space-between" mt="xs" px="md">
          <Text fz="sm" fw={700}>
            {asset?.name}
          </Text>
        </Group>
        <SimpleGrid cols={2} p="md">
          {items}
        </SimpleGrid>
      </Popover.Dropdown>
    </Popover>
  )
}
