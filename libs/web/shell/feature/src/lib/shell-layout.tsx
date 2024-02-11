import { Button, Group } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useAuth } from '@pubkey-link/web-auth-data-access'
import { UiHeaderProfile } from '@pubkey-link/web-ui-core'
import { UiHeader, UiLayout, UiLoader } from '@pubkey-ui/core'
import { IconSettings } from '@tabler/icons-react'
import { ReactNode, Suspense } from 'react'
import { Link } from 'react-router-dom'

export function ShellLayout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth()
  const [opened, { toggle }] = useDisclosure(false)
  return (
    <UiLayout
      header={
        <UiHeader
          opened={opened}
          toggle={toggle}
          links={[
            { link: '/dashboard', label: 'Dashboard' },
            { link: '/c', label: 'Communities' },
            { link: `${user?.profileUrl}`, label: 'Profile' },
          ]}
          profile={
            <Group gap="xs">
              <Button component={Link} to="/settings" variant="light" leftSection={<IconSettings size={20} />}>
                Settings
              </Button>
              <UiHeaderProfile user={user} logout={logout} />
            </Group>
          }
        />
      }
    >
      <Suspense fallback={<UiLoader mt="xl" size="xl" type="dots" />}>{children}</Suspense>
    </UiLayout>
  )
}
