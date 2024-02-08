import { AvatarProps, type GroupProps, Text } from '@mantine/core'
import { useUserFindOneUserById } from '@pubkey-link/web-user-data-access'
import { type UiAnchorProps, UiLoader } from '@pubkey-ui/core'
import { UserUiItem } from './user-ui-item'

export function UserUiItemById({
  userId,
  ...props
}: {
  userId: string
  anchorProps?: UiAnchorProps
  avatarProps?: Omit<AvatarProps, 'src'>
  groupProps?: GroupProps
  to?: string | null
}) {
  const { query } = useUserFindOneUserById({ userId })

  return query.isLoading ? (
    <UiLoader size="xs" type="dots" />
  ) : query.data?.item ? (
    <UserUiItem user={query.data.item} to={query.data.item.profileUrl} {...props} />
  ) : (
    <Text c="red">User not found</Text>
  )
}
