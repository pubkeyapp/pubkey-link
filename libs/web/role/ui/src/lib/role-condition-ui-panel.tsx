import { RoleCondition } from '@pubkey-link/sdk'
import { UiStack } from '@pubkey-ui/core'

import { RoleConditionUiSettings } from './role-condition-ui-settings'

export function RoleConditionUiPanel({ condition }: { condition: RoleCondition }) {
  return (
    <UiStack>
      <RoleConditionUiSettings condition={condition} />
    </UiStack>
  )
}
