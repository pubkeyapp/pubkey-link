import { AspectRatio, Card, Group, Image, Stack, Text } from '@mantine/core'
import { Collection } from '@pubkey-link/sdk'
import React from 'react'
import { Link } from 'react-router-dom'

export function CollectionUiGridItem({ item }: { item: Collection }) {
  return (
    <Card withBorder component={Link} to={`./${item.id}`}>
      <Card.Section>
        <AspectRatio ratio={1}>
          <Image src={item.imageUrl} radius="xs" />
        </AspectRatio>
      </Card.Section>
      <Card.Section p="md">
        <Group>
          <Stack>
            <Text>{item.name}</Text>
            <Text size="sm" c="dimmed">
              {item.description}
            </Text>
          </Stack>
        </Group>
      </Card.Section>
    </Card>
  )
}
