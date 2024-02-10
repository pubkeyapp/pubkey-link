import { AvatarProps, Group, type GroupProps, Stack, Text } from '@mantine/core'
import { ellipsify, NetworkToken } from '@pubkey-link/sdk'
import { UiAnchor, type UiAnchorProps, UiCopy, UiDebugModal } from '@pubkey-ui/core'
import { NetworkTokenUiAvatar } from './network-token-ui-avatar'
import { NetworkTokenUiTypeBadge } from './network-token-ui-type-badge'

export function NetworkTokenUiItem({
  anchorProps,
  avatarProps,
  groupProps,
  networkToken,
  to,
}: {
  anchorProps?: UiAnchorProps
  avatarProps?: Omit<AvatarProps, 'src'>
  groupProps?: GroupProps
  networkToken?: NetworkToken | null
  to?: string | null
}) {
  if (!networkToken) return null

  return (
    <UiAnchor to={to ?? undefined} underline="never" {...anchorProps}>
      <Group gap="sm" {...groupProps}>
        <NetworkTokenUiAvatar networkToken={networkToken} {...avatarProps} />
        <Stack gap={1}>
          <Group gap="xs">
            <NetworkTokenUiTypeBadge type={networkToken.type} />
            <Text size="lg" fw={500}>
              {networkToken?.name}
            </Text>
          </Group>
          <Group gap={4}>
            <UiDebugModal data={networkToken} />
            <UiCopy text={networkToken.account} tooltip="Copy account address" />
            <Text size="sm" c="dimmed">
              {ellipsify(networkToken.account, 10)}
            </Text>
          </Group>
        </Stack>
      </Group>
    </UiAnchor>
  )
}
