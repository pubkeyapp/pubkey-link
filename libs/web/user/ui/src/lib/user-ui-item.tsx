import { AvatarProps, Group, type GroupProps, Stack, Text } from '@mantine/core'
import { User } from '@pubkey-link/sdk'
import { UiAnchor, type UiAnchorProps } from '@pubkey-ui/core'
import { ReactNode } from 'react'
import { UserUiAvatar } from './user-ui-avatar'

export function UserUiItem({
  anchorProps,
  avatarProps,
  children,
  groupProps,
  user,
  to,
}: {
  anchorProps?: UiAnchorProps
  avatarProps?: Omit<AvatarProps, 'src'>
  groupProps?: GroupProps
  children?: ReactNode
  user?: User
  to?: string | null
}) {
  if (!user) return null

  return (
    <UiAnchor to={to ?? undefined} underline="never" {...anchorProps}>
      <Group gap="sm" {...groupProps}>
        <UserUiAvatar user={user} {...avatarProps} />
        <Stack gap={1}>
          <Text size="lg" fw="bold">
            {user?.username}
          </Text>
          {children ? (
            children
          ) : user.name ? (
            <Text size="sm" c="dimmed">
              {user.name}
            </Text>
          ) : null}
        </Stack>
      </Group>
    </UiAnchor>
  )
}
