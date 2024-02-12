import { Role } from '@pubkey-link/sdk'
import { UiStack, UiStackProps } from '@pubkey-ui/core'
import { RoleConditionUiSummary } from './role-condition-ui-summary'
import { RoleUiItem } from './role-ui-item'

export function RoleUiList({ roles, ...props }: Omit<UiStackProps, 'children'> & { roles: Role[] }) {
  return (
    <UiStack {...props}>
      {roles?.map((role) => (
        <RoleUiItem key={role.id} role={role} avatarProps={{ size: 'lg' }}>
          {role?.conditions?.length ? (
            <UiStack gap="xs">
              {role?.conditions?.map((condition) => (
                <RoleConditionUiSummary key={condition.id} condition={condition} />
              ))}
            </UiStack>
          ) : null}
        </RoleUiItem>
      ))}
    </UiStack>
  )
}
