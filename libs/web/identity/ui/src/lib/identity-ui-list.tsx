import {
  Identity,
  UserAddIdentityGrantInput,
  UserRemoveIdentityGrantInput,
  UserUpdateIdentityInput,
} from '@pubkey-link/sdk'
import { UiStack } from '@pubkey-ui/core'
import { IdentityUiListItem } from './identity-ui-list-item'

export function IdentityUiList({
  deleteIdentity,
  updateIdentity,
  addIdentityGrant,
  removeIdentityGrant,
  refresh,
  items,
}: {
  refresh?: () => void
  deleteIdentity: (id: string) => Promise<void>
  updateIdentity: (id: string, input: UserUpdateIdentityInput) => Promise<void>
  addIdentityGrant?: (input: UserAddIdentityGrantInput) => Promise<void>
  removeIdentityGrant?: (input: UserRemoveIdentityGrantInput) => Promise<void>
  items: Identity[]
}) {
  return (
    <UiStack>
      {items?.map((item) => (
        <IdentityUiListItem
          deleteIdentity={deleteIdentity}
          updateIdentity={updateIdentity}
          addIdentityGrant={addIdentityGrant}
          removeIdentityGrant={removeIdentityGrant}
          refresh={refresh}
          item={item}
          key={item.id}
        />
      ))}
    </UiStack>
  )
}
