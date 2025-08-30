import { AspectRatio, Badge, Box, Group, Image, Popover, SimpleGrid, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { CollectionAsset, IdentityProvider } from '@pubkey-link/sdk'
import { useAuth } from '@pubkey-link/web-auth-data-access'

export function CollectionUiAssetGridItem({ asset, cols }: { asset: CollectionAsset; cols: number }) {
  const [opened, { close, open }] = useDisclosure(false)
  const { user } = useAuth()

  const userWallets = user?.identities?.filter((identity) => identity.provider === IdentityProvider.Solana)

  const isOwned = userWallets?.some((wallet) => wallet.providerId === asset.owner)

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

  const nameSize: Record<number, string> = {
    4: 'md',
    8: 'sm',
    12: 'xs',
  }

  const needResponsiveBadge = cols > 8

  return (
    <Popover width={300} position="right" withArrow shadow="md" opened={opened}>
      <Popover.Target>
        <Box onMouseEnter={open} onMouseLeave={close} bg="default" p={4}>
          <AspectRatio ratio={1} mb={8} pos="relative">
            <Image src={asset.imageUrl} />
            {isOwned && (
              <Badge
                pos="absolute"
                top={needResponsiveBadge ? 0 : 4}
                left={needResponsiveBadge ? 0 : 4}
                w={needResponsiveBadge ? 0 : '70px'}
                radius={needResponsiveBadge ? 100 : 0}
                bg={needResponsiveBadge ? 'transparent' : '#0C291F'}
                color={needResponsiveBadge ? '#0C291F' : undefined}
                size="md"
                variant={needResponsiveBadge ? 'dot' : 'default'}
                style={{ zIndex: 1, border: 'none' }}
              >
                {needResponsiveBadge ? null : (
                  <Text size="xs" c="#77DEBB">
                    Owned
                  </Text>
                )}
              </Badge>
            )}
          </AspectRatio>
          <Text ta="center" size={nameSize[cols]}>
            {asset.name}
          </Text>
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
