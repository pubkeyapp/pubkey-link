import { AspectRatio, Box, Group, Image, Popover, SimpleGrid, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { DAS } from 'helius-sdk'
import React from 'react'

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
