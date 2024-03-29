import { Identity, UserUpdateIdentityInput } from '@pubkey-link/sdk'
import { UiStack } from '@pubkey-ui/core'
import { IdentityUiListItem } from './identity-ui-list-item'

export function IdentityUiList({
  deleteIdentity,
  updateIdentity,
  refresh,
  items,
}: {
  refresh?: () => void
  deleteIdentity: (id: string) => Promise<void>
  updateIdentity: (id: string, input: UserUpdateIdentityInput) => Promise<void>
  items: Identity[]
}) {
  return (
    <UiStack>
      {items?.map((item) => (
        <IdentityUiListItem
          deleteIdentity={deleteIdentity}
          updateIdentity={updateIdentity}
          refresh={refresh}
          item={item}
          key={item.id}
        />
      ))}
    </UiStack>
  )
}
