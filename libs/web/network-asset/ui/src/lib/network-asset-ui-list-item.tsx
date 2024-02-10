import { Group, Stack, Text } from '@mantine/core'
import { NetworkAsset } from '@pubkey-link/sdk'
import { UiAnchor, UiAnchorProps, UiDebugModal } from '@pubkey-ui/core'
import { NetworkAssetUiAvatar } from './network-asset-ui-avatar'

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
