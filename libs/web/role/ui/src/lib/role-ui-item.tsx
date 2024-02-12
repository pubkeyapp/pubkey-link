import { AvatarProps, Group, type GroupProps, Stack, Text, TextProps } from '@mantine/core'
import { Role } from '@pubkey-link/sdk'
import { UiAnchor, type UiAnchorProps } from '@pubkey-ui/core'
import { ReactNode } from 'react'
import { RoleUiAvatar } from './role-ui-avatar'

export function RoleUiItem({
  anchorProps,
  avatarProps,
  children,
  groupProps,
  textProps,
  role,
  to,
}: {
  anchorProps?: UiAnchorProps
  avatarProps?: Omit<AvatarProps, 'src'>
  children?: ReactNode
  groupProps?: GroupProps
  textProps?: TextProps
  role?: Role
  to?: string | null
}) {
  if (!role) return null

  return (
    <UiAnchor to={to ?? undefined} underline="never" {...anchorProps}>
      <Group gap="sm" {...groupProps}>
        <RoleUiAvatar role={role} {...avatarProps} />
        <Stack gap={1}>
          <Text size="lg" fw={500} {...textProps}>
            {role?.name}
          </Text>
          {children}
        </Stack>
      </Group>
    </UiAnchor>
  )
}
