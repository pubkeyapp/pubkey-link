import { Button } from '@mantine/core'
import { AdminCreateAppUserInput, AppUserRole, type User } from '@pubkey-link/sdk'
import { AdminUserUiAutocomplete, UserUiItem } from '@pubkey-link/web-user-ui'
import { UiGroup, UiStack } from '@pubkey-ui/core'
import { useState } from 'react'
import { AppUserUiRoleBadge } from './app-user-ui-role-badge'
import { AppUserUiRoleSelect } from './app-user-ui-role-select'

export function AdminAppUserUiCreateForm({ submit }: { submit: (res: AdminCreateAppUserInput) => Promise<boolean> }) {
  const [role, setRole] = useState<AppUserRole | undefined>(undefined)
  const [user, setUser] = useState<User | undefined>(undefined)

  function handleClick() {
    if (!user || !role) return
    return submit({ role, userId: user.id, appId: '' })
  }

  return (
    <UiStack gap="xl">
      <AdminUserUiAutocomplete selectUser={setUser} />
      <AppUserUiRoleSelect disabled={!user} role={role} setRole={setRole} />
      <UiGroup>
        {user ? <UserUiItem pl="xs" user={user} status={role ? <AppUserUiRoleBadge role={role} /> : null} /> : <div />}
        <Button disabled={!user || !role} onClick={handleClick} variant="light">
          Add
        </Button>
      </UiGroup>
    </UiStack>
  )
}
