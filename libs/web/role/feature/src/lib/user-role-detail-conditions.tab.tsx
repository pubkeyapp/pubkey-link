import { Community, Role } from '@pubkey-link/sdk'
import { useAdminFindManyNetworkToken } from '@pubkey-link/web-network-token-data-access'
import { RoleConditionUiCreateWizard } from '@pubkey-link/web-role-ui'
import { UserRoleConditionListFeature } from './user-role-condition-list.feature'

export function UserRoleDetailConditionsTab({ community, role }: { community: Community; role: Role }) {
  const { items } = useAdminFindManyNetworkToken({ cluster: community.cluster })
  return role.conditions?.length ? (
    <UserRoleConditionListFeature role={role} community={community} tokens={items ?? []} />
  ) : (
    <RoleConditionUiCreateWizard role={role} community={community} tokens={items ?? []} />
  )
}
