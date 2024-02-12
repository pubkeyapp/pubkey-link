import { Identity } from '@pubkey-link/sdk'
import { UiStack } from '@pubkey-ui/core'
import { IdentityUiListItem } from './identity-ui-list-item'

export function IdentityUiList({
  deleteIdentity,
  refresh,
  items,
}: {
  refresh?: () => void
  deleteIdentity?: (id: string) => void
  items: Identity[]
}) {
  return (
    <UiStack>
      {items?.map((item) => (
        <IdentityUiListItem deleteIdentity={deleteIdentity} refresh={refresh} item={item} key={item.id} />
      ))}
    </UiStack>
  )
}
