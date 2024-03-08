import { AvatarProps, Group, type GroupProps, Stack, Text } from '@mantine/core'
import { NetworkToken } from '@pubkey-link/sdk'
import { ReactNode } from 'react'
import { NetworkTokenUiAvatar } from './network-token-ui-avatar'
import { NetworkTokenUiTypeBadge } from './network-token-ui-type-badge'

export function NetworkTokenUiLabel({
  avatarProps,
  children,
  groupProps,
  networkToken,
}: {
  avatarProps?: Omit<AvatarProps, 'src'>
  children?: ReactNode
  groupProps?: GroupProps
  networkToken?: NetworkToken | null
}) {
  if (!networkToken) return null

  return (
    <Group gap={8} wrap="nowrap" {...groupProps}>
      <NetworkTokenUiAvatar size="sm" networkToken={networkToken} {...avatarProps} />
      <Stack gap={0}>
        <Group gap={8} wrap="nowrap">
          <Text size="sm" fw={500}>
            {networkToken?.name}
          </Text>
          <NetworkTokenUiTypeBadge type={networkToken.type} />
        </Group>
        {children}
      </Stack>
    </Group>
  )
}
