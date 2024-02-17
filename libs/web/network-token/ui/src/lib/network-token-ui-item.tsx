import { AvatarProps, Group, type GroupProps, Stack, Text } from '@mantine/core'
import { ellipsify, NetworkCluster, NetworkToken } from '@pubkey-link/sdk'
import { UiAnchor, type UiAnchorProps, UiCopy, UiDebugModal } from '@pubkey-ui/core'
import { NetworkTokenUiAvatar } from './network-token-ui-avatar'
import { NetworkTokenUiExplorerIcon } from './network-token-ui-explorer-icon'

export function NetworkTokenUiItem({
  anchorProps,
  avatarProps,
  groupProps,
  networkToken,
  to,
  cluster,
}: {
  anchorProps?: UiAnchorProps
  avatarProps?: Omit<AvatarProps, 'src'>
  groupProps?: GroupProps
  networkToken?: NetworkToken | null
  to?: string | null
  cluster?: NetworkCluster
}) {
  if (!networkToken) return null

  return (
    <UiAnchor to={to ?? undefined} underline="never" {...anchorProps}>
      <Group gap="sm" wrap="nowrap" {...groupProps}>
        <NetworkTokenUiAvatar networkToken={networkToken} {...avatarProps} />
        <Stack gap={4}>
          <Group gap="xs" wrap="nowrap">
            <Text size="lg" fw={500}>
              {networkToken?.name}
            </Text>
          </Group>
          <Group gap={4} wrap="nowrap">
            <UiCopy text={networkToken.account} tooltip="Copy account address" />
            <NetworkTokenUiExplorerIcon token={{ ...networkToken, cluster: networkToken.cluster ?? cluster }} />
            <UiDebugModal data={networkToken} />
            <Text size="sm" c="dimmed">
              {ellipsify(networkToken.account, 10)}
            </Text>
          </Group>
        </Stack>
      </Group>
    </UiAnchor>
  )
}
