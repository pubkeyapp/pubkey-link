import { Paper } from '@mantine/core'
import { NetworkTokenType, RoleCondition, UserUpdateRoleConditionInput } from '@pubkey-link/sdk'
import { NetworkTokenUiItem } from '@pubkey-link/web-network-token-ui'
import { useUserFindOneRole } from '@pubkey-link/web-role-data-access'
import { UiDebug, UiStack } from '@pubkey-ui/core'
import { RoleConditionUiUpdateFormFungible } from './role-condition-ui-update-form-fungible'
import { RoleConditionUiUpdateFormNonFungible } from './role-condition-ui-update-form-non-fungible'

export function RoleConditionUiSettings({ condition }: { condition: RoleCondition }) {
  const { updateRoleCondition } = useUserFindOneRole({ roleId: condition.roleId! })
  function update(input: UserUpdateRoleConditionInput) {
    return updateRoleCondition(condition.id, {
      ...input,
      config: input.config ? JSON.parse(input.config) : undefined,
      filters: input.filters ? JSON.parse(input.filters) : undefined,
    })
  }

  switch (condition.type) {
    case NetworkTokenType.NonFungible:
      return condition.token ? (
        <Paper withBorder p="md" radius="sm" shadow="md">
          <UiStack>
            <NetworkTokenUiItem networkToken={condition.token} />
            <RoleConditionUiUpdateFormNonFungible item={condition} submit={update} />
          </UiStack>
        </Paper>
      ) : (
        <UiDebug data={condition} />
      )
    case NetworkTokenType.Fungible:
      return condition.token ? (
        <Paper withBorder p="md" radius="sm" shadow="md">
          <UiStack>
            <NetworkTokenUiItem networkToken={condition.token} />
            <RoleConditionUiUpdateFormFungible item={condition} submit={update} />
          </UiStack>
        </Paper>
      ) : (
        <UiDebug data={condition} />
      )
    default:
      return (
        <UiStack>
          <UiDebug data={condition} open />
        </UiStack>
      )
  }
}
