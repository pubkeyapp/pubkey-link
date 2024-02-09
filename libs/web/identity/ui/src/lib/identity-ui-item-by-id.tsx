import { AvatarProps, type GroupProps, Text } from '@mantine/core'
import { IdentityProvider } from '@pubkey-link/sdk'
import { useUserFindOneIdentity } from '@pubkey-link/web-identity-data-access'
import { UiKeyValueTable } from '@pubkey-link/web-ui-core'
import { UserUiItemById } from '@pubkey-link/web-user-ui'
import { type UiAnchorProps, UiLoader } from '@pubkey-ui/core'
import { IdentityUiItem } from './identity-ui-item'

export function IdentityUiItemById({
  provider,
  providerId,
  ...props
}: {
  provider: IdentityProvider
  providerId: string
  anchorProps?: UiAnchorProps
  avatarProps?: Omit<AvatarProps, 'src'>
  groupProps?: GroupProps
  to?: string | null
}) {
  const { query } = useUserFindOneIdentity({ provider, providerId })

  return query.isLoading ? (
    <UiLoader size="xs" type="dots" />
  ) : query.data?.item ? (
    <UiKeyValueTable
      items={[
        query.data.item.ownerId ? [<Text>Owner</Text>, <UserUiItemById userId={query.data.item.ownerId} />] : undefined,
        [<Text>Identity</Text>, <IdentityUiItem identity={query.data.item} {...props} />],
      ]}
    />
  ) : (
    <Text c="red">User not found</Text>
  )
}
