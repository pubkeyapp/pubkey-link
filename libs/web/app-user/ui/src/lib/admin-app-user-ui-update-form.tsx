import { Button, Group } from '@mantine/core'
import { AdminUpdateAppUserInput, AppUser, AppUserRole } from '@pubkey-link/sdk'
import { UiModalButton } from '@pubkey-link/web-ui-core'
import { IconPencil } from '@tabler/icons-react'
import { useState } from 'react'
import { AppUserUiRoleSelect } from './app-user-ui-role-select'

export function AdminAppUserUiUpdateForm({
  submit,
  appUser,
}: {
  submit: (res: AdminUpdateAppUserInput) => Promise<boolean>
  appUser: AppUser
}) {
  const [role, setRole] = useState<AppUserRole | undefined>(appUser.role)

  return (
    <UiModalButton icon={IconPencil} title={`Update Role for ${appUser.user?.username}`}>
      <AppUserUiRoleSelect role={role} setRole={setRole} />
      <Group justify="right">
        <Button
          disabled={!role}
          onClick={() => submit({ appId: appUser.appId, userId: appUser.userId, role: role as AppUserRole })}
        >
          Update
        </Button>
      </Group>
    </UiModalButton>
  )
}
