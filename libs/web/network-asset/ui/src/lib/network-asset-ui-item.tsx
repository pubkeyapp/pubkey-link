import { Card, Group, Stack, Text } from '@mantine/core'
import { NetworkAsset } from '@pubkey-link/sdk'
import { UiAnchor, type UiAnchorProps, UiDebugModal } from '@pubkey-ui/core'
import { NetworkAssetUiAvatar } from './network-asset-ui-avatar'
import { NetworkAssetUiImage } from './network-asset-ui-image'

export function NetworkAssetUiItem({
  anchorProps,
  networkAsset,
  to,
}: {
  anchorProps?: UiAnchorProps
  networkAsset?: NetworkAsset
  to?: string | null
}) {
  if (!networkAsset) return null

  return (
    <Card withBorder>
      <Card.Section>
        <UiAnchor to={to ?? undefined} underline="never" {...anchorProps}>
          {networkAsset.imageUrl ? (
            <NetworkAssetUiImage networkAsset={networkAsset} />
          ) : (
            <NetworkAssetUiAvatar networkAsset={networkAsset} />
          )}
        </UiAnchor>
      </Card.Section>
      <Card.Section mt="md" p="md">
        <Group justify="apart">
          <Text fz="lg" fw={500}>
            {networkAsset?.name}
          </Text>
        </Group>
        <Group justify="between">
          <div>
            <Text fz="sm" mt="xs">
              {networkAsset?.symbol}
            </Text>
          </div>
          <UiDebugModal data={networkAsset} />
        </Group>
      </Card.Section>
    </Card>
  )
}

export function NetworkAssetUiListItem({
  anchorProps,
  networkAsset,
  to,
}: {
  anchorProps?: UiAnchorProps
  networkAsset?: NetworkAsset
  to?: string | null
}) {
  if (!networkAsset) return null

  return (
    <Group>
      <UiAnchor to={to ?? undefined} underline="never" {...anchorProps}>
        <NetworkAssetUiAvatar radius="sm" networkAsset={networkAsset} />
      </UiAnchor>
      <Stack gap={0}>
        <Text fw="bold">{networkAsset?.symbol}</Text>
        <Text fz="xs">{networkAsset?.name}</Text>
      </Stack>
      <Group justify="between">
        <div></div>
        <UiDebugModal data={networkAsset} />
      </Group>
    </Group>
  )
}
