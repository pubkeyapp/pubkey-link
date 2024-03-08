import { Button } from '@mantine/core'
import type { User } from '@pubkey-link/sdk'
import { UserUiAvatar } from '@pubkey-link/web-user-ui'
import { UiStack } from '@pubkey-ui/core'
import { IconDoorExit } from '@tabler/icons-react'

export function AuthUiLogout({
  logout,
  navigate,
  user,
}: {
  logout: () => Promise<boolean | undefined>
  navigate: () => void
  user: User
}) {
  return (
    <UiStack>
      <Button radius="md" size="xl" fullWidth onClick={navigate} leftSection={<UserUiAvatar user={user} size={28} />}>
        Continue as {user.username}
      </Button>
      <Button radius="md" size="xl" fullWidth variant="light" onClick={logout} leftSection={<IconDoorExit size={28} />}>
        Logout {user.username}
      </Button>
    </UiStack>
  )
}
