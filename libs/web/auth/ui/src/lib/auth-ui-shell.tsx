import { Button } from '@mantine/core'
import { IdentityProvider, type User } from '@pubkey-link/sdk'
import { IdentityUiLoginButtons } from '@pubkey-link/web-identity-ui'
import { UserUiAvatar } from '@pubkey-link/web-user-ui'
import { UiStack } from '@pubkey-ui/core'
import { IconDoorExit } from '@tabler/icons-react'
import { ReactNode } from 'react'
import { AuthUiPage } from './auth-ui-page'

export function AuthUiShell({
  authEnabled,
  children,
  enabledProviders,
  loading,
  logout,
  navigate,
  refresh,
  user,
}: {
  authEnabled: boolean
  children: ReactNode
  enabledProviders: IdentityProvider[]
  loading: boolean
  logout: () => Promise<boolean | undefined>
  navigate: () => void
  refresh: () => Promise<boolean>
  user?: User
}) {
  return (
    <AuthUiPage authEnabled={authEnabled}>
      {user ? (
        <UiStack>
          <Button
            radius="md"
            size="xl"
            disabled={loading}
            fullWidth
            onClick={navigate}
            leftSection={<UserUiAvatar user={user} size={28} />}
          >
            Continue as {user.username}
          </Button>
          <Button
            radius="md"
            size="xl"
            disabled={loading}
            fullWidth
            variant="light"
            onClick={logout}
            leftSection={<IconDoorExit size={28} />}
          >
            Logout {user.username}
          </Button>
        </UiStack>
      ) : (
        <UiStack>
          <IdentityUiLoginButtons mb="md" mt="md" enabledProviders={enabledProviders} refresh={refresh} />
          {children}
        </UiStack>
      )}
    </AuthUiPage>
  )
}
