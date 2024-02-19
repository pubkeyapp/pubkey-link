import { ActionIcon, Group } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useAuth } from '@pubkey-link/web-auth-data-access'
import { UiHeaderProfile } from '@pubkey-link/web-ui-core'
import { UiHeader, UiLayout, UiLoader, UiLogoType } from '@pubkey-ui/core'
import { IconBug, IconSettings, IconShield } from '@tabler/icons-react'
import { ReactNode, Suspense } from 'react'
import { Link } from 'react-router-dom'

export function ShellLayout({ children }: { children: ReactNode }) {
  const { isAdmin, isDeveloper, user } = useAuth()
  const [opened, { toggle }] = useDisclosure(false)
  return (
    <UiLayout
      header={
        <UiHeader
          logoSmall={<UiLogoType height={28} />}
          opened={opened}
          toggle={toggle}
          links={[
            { link: '/c', label: 'Communities' },
            { link: `${user?.profileUrl}`, label: 'Profile' },
            { link: '/settings', label: 'Settings' },
          ]}
          profile={
            <Group gap="xs">
              {isAdmin && (
                <ActionIcon component={Link} to="/admin" variant="light" size="lg">
                  <IconShield />
                </ActionIcon>
              )}
              {isAdmin && isDeveloper && (
                <ActionIcon component={Link} to="/admin/development" variant="light" size="lg">
                  <IconBug />
                </ActionIcon>
              )}
              <ActionIcon component={Link} to="/settings" variant="light" size="lg">
                <IconSettings />
              </ActionIcon>
              <UiHeaderProfile />
            </Group>
          }
        />
      }
    >
      <Suspense fallback={<UiLoader mt="xl" size="xl" type="dots" />}>{children}</Suspense>
    </UiLayout>
  )
}
