import { AvatarProps, Group, type GroupProps, Stack, Text } from '@mantine/core'
import { Network } from '@pubkey-link/sdk'
import { UiAnchor, type UiAnchorProps } from '@pubkey-ui/core'
import { ReactNode } from 'react'
import { NetworkUiAvatar } from './network-ui-avatar'

export function NetworkUiItem({
  anchorProps,
  avatarProps,
  groupProps,
  network,
  title,
  to,
}: {
  anchorProps?: UiAnchorProps
  avatarProps?: Omit<AvatarProps, 'src'>
  groupProps?: GroupProps
  network?: Network
  title?: ReactNode
  to?: string | null
}) {
  if (!network) return null

  return (
    <UiAnchor to={to ?? undefined} underline="never" {...anchorProps}>
      <Group gap="sm" {...groupProps}>
        <NetworkUiAvatar network={network} {...avatarProps} />
        <Stack gap={0}>
          <Group gap="xs">
            <Text size="lg" fw="bold">
              {network.name}
            </Text>
            {title}
          </Group>
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
