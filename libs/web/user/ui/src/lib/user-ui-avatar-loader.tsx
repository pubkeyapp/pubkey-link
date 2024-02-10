import { Text } from '@mantine/core'
import { UiAvatar, UiAvatarProps } from '@pubkey-link/web-ui-core'
import { useUserFindOneUserById } from '@pubkey-link/web-user-data-access'
import { UiAnchor, UiLoader } from '@pubkey-ui/core'
import { UserUiAvatar } from './user-ui-avatar'

export function UserUiAvatarLoader({
  userId,
  ...props
}: UiAvatarProps & {
  userId?: string | null
}) {
  if (!userId) {
    return <UiAvatar {...props} />
  }
  return <FetchAvatarById userId={userId} {...props} />
}
export function FetchAvatarById({
  userId,
  ...props
}: UiAvatarProps & {
  userId: string
}) {
  const { query } = useUserFindOneUserById({ userId })

  return query.isLoading ? (
    <UiLoader size="xs" type="dots" />
  ) : query.data?.item ? (
    <UiAnchor to={query.data.item.profileUrl}>
      <UserUiAvatar user={query.data.item} {...props} />
    </UiAnchor>
  ) : (
    <Text c="red">User not found</Text>
  )
}
