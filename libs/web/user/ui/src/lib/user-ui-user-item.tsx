import { Anchor, GroupProps, Stack } from '@mantine/core'
import { type User } from '@pubkey-link/sdk'
import { UiGroup } from '@pubkey-ui/core'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { UserUiAvatar } from './user-ui-avatar'

export interface UserUiItemProps extends Omit<GroupProps, 'content'> {
  action?: ReactNode
  avatar?: ReactNode
  children?: ReactNode
  content?: ReactNode
  status?: ReactNode
  to?: string
  user?: User | null
}

export function UserUiItem({ action, avatar, children, content, status, to, user, ...props }: UserUiItemProps) {
  if (!user) return null
  return (
    <UiGroup justify="left" gap="xs" style={{ flexGrow: 1 }} align={content ? 'start' : 'center'} p={0} {...props}>
      {avatar ? avatar : <UserUiAvatar user={user} mt={content ? 'xs' : undefined} />}
      <Stack gap={0} style={{ flexGrow: 1 }} p={0} m={0}>
        <UiGroup p={0} m={0}>
          <UiGroup justify="left" gap={4} align="baseline">
            {user?.username ? (
              <Anchor component={Link} to={to ?? `/profile/${user.username}`} fw={700}>
                {user?.username ?? 'Unknown'}
              </Anchor>
            ) : null}
            {status}
          </UiGroup>
          {action}
        </UiGroup>
        {content}
      </Stack>
      {children}
    </UiGroup>
  )
}
