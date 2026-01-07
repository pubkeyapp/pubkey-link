import { Role } from '@pubkey-link/sdk'
import { Text } from '@mantine/core'
import { UiCard, UiGroup, UiStack, UiStackProps, UiWarning } from '@pubkey-ui/core'
import { RoleConditionUiAmount } from './role-condition-ui-amount'
import { RoleConditionUiSummary } from './role-condition-ui-summary'
import { RoleUiItem } from './role-ui-item'

export function RoleUiList({
  roles,
  username,
  withAssets = false,
  ...props
}: Omit<UiStackProps, 'children'> & { roles: Role[]; username: string; withAssets?: boolean }) {
  return (
    <UiStack {...props}>
      {roles?.map((role) => (
        <UiCard key={role.id}>
          <UiStack>
            <RoleUiItem role={role} avatarProps={{ size: 'md' }} />
            {role.conditions?.length ? (
              <UiGroup gap="md" mt="xs" align="center" wrap="nowrap" justify="flex-start">
                <Text size="md" ff="mono" c="dimmed">
                  Requirement:
                </Text>
                {role.conditions?.map((condition) => (
                  <RoleConditionUiAmount key={condition.id} condition={condition} />
                ))}
              </UiGroup>
            ) : (
              <UiWarning message={`No conditions found for role ${role.name}`} />
            )}
          </UiStack>
        </UiCard>
      ))}
    </UiStack>
  )
}
