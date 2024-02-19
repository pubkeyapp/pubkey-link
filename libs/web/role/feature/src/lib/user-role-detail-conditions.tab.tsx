import { Community, Role } from '@pubkey-link/sdk'
import { useUserFindManyNetworkToken } from '@pubkey-link/web-network-token-data-access'
import { RoleConditionUiCreateWizard } from '@pubkey-link/web-role-ui'
import { UserRoleConditionListFeature } from './user-role-condition-list.feature'

export function UserRoleDetailConditionsTab({ community, role }: { community: Community; role: Role }) {
  const { items } = useUserFindManyNetworkToken({ cluster: community.cluster })
  return role.conditions?.length ? (
    <UserRoleConditionListFeature role={role} community={community} tokens={items ?? []} />
  ) : (
    <RoleConditionUiCreateWizard role={role} community={community} tokens={items ?? []} />
  )
}
