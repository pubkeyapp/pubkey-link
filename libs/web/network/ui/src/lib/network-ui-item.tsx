import { AvatarProps, Group, type GroupProps, Stack, Text } from '@mantine/core'
import { Network } from '@pubkey-link/sdk'
import { UiAnchor, type UiAnchorProps } from '@pubkey-ui/core'
import { NetworkUiAvatar } from './network-ui-avatar'

export function NetworkUiItem({
  anchorProps,
  avatarProps,
  groupProps,
  network,
  to,
}: {
  anchorProps?: UiAnchorProps
  avatarProps?: Omit<AvatarProps, 'src'>
  groupProps?: GroupProps
  network?: Network
  to?: string | null
}) {
  if (!network) return null

  return (
    <UiAnchor to={to ?? undefined} underline="never" {...anchorProps}>
      <Group gap="sm" {...groupProps}>
        <NetworkUiAvatar network={network} {...avatarProps} />
        <Stack gap={1}>
          <Text size="lg" fw={500}>
            {network.name}
          </Text>
          <Text size="xs" c="dimmed">
            {network.endpoint
              // Remove http(s):// from the beginning of the string
              ?.replace(/https?:\/\//, '')
              // Remove query params from the end of the string
              ?.replace(/\/\?.*/, '')}
          </Text>
        </Stack>
      </Group>
    </UiAnchor>
  )
}
