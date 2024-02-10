import { Card, Stack, Text } from '@mantine/core'
import { NetworkAsset } from '@pubkey-link/sdk'
import { UiAnchor, type UiAnchorProps, UiDebugModal, UiGroup } from '@pubkey-ui/core'
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
      <Card.Section mt="md" p="xs">
        <UiGroup wrap="nowrap" w="100%" align="start">
          <Stack gap={0}>
            <Text fz="xs" fw={500}>
              {networkAsset?.name}
            </Text>
            <Text fz="sm" c="dimmed">
              {networkAsset?.symbol}
            </Text>
          </Stack>
          <UiDebugModal data={networkAsset} />
        </UiGroup>
      </Card.Section>
    </Card>
  )
}
