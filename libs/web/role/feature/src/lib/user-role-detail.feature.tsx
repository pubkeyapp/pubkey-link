import { Group } from '@mantine/core'
import { Community } from '@pubkey-link/sdk'
import { useAdminFindManyNetworkToken } from '@pubkey-link/web-network-token-data-access'
import { useUserFindOneRole } from '@pubkey-link/web-role-data-access'
import { RoleConditionUiAddButton, RoleUiItem } from '@pubkey-link/web-role-ui'
import { UiBack, UiCard, UiCardTitle, UiDebugModal, UiError, UiGroup, UiLoader, UiStack } from '@pubkey-ui/core'
import { useParams } from 'react-router-dom'
import { UserRoleDetailConditionsTab } from './user-role-detail-conditions.tab'
import { AddPermissionButton, UserRoleDetailPermissionsTab } from './user-role-detail-permissions.tab'
import { UserRoleDetailSettingsTab } from './user-role-detail-settings.tab'

export function UserRoleDetailFeature({ community }: { community: Community }) {
  const { roleId } = useParams<{ roleId: string }>() as { roleId: string }
  const { item, query } = useUserFindOneRole({ roleId })
  const { items: tokens } = useAdminFindManyNetworkToken({ cluster: community.cluster })

  return query.isLoading ? (
    <UiLoader />
  ) : item ? (
    <UiStack>
      <UiGroup>
        <Group>
          <UiBack />
          <RoleUiItem role={item} />
        </Group>
        <UiDebugModal data={item} />
      </UiGroup>
      <UiStack>
        <UiCard
          title={
            <UiGroup>
              <UiCardTitle>Conditions</UiCardTitle>
              <RoleConditionUiAddButton community={community} tokens={tokens} role={item} />
            </UiGroup>
          }
        >
          <UserRoleDetailConditionsTab community={community} role={item} />
        </UiCard>
        <UiCard
          title={
            <UiGroup>
              <UiCardTitle>Permissions</UiCardTitle>
              <AddPermissionButton role={item} />
            </UiGroup>
          }
        >
          <UserRoleDetailPermissionsTab role={item} />
        </UiCard>
        <UiCard title="Settings">
          <UserRoleDetailSettingsTab roleId={roleId} />
        </UiCard>
      </UiStack>
    </UiStack>
  ) : (
    <UiError message="Role not found." />
  )
}
