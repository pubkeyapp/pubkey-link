import { Button, Menu } from '@mantine/core'
import { User, UserRole } from '@pubkey-link/sdk'
import { useUiColorScheme } from '@pubkey-ui/core'
import { IconBug, IconLogout, IconMoonStars, IconSettings, IconShield, IconSun, IconUser } from '@tabler/icons-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { UiAvatar } from './ui-avatar'

export function UiHeaderProfile({ user, logout }: { user?: User | null; logout: () => void }) {
  const { colorScheme, toggleColorScheme } = useUiColorScheme()
  const [open, setOpen] = useState(false)
  const isAdmin = user?.role === UserRole.Admin
  const isDeveloper = user?.developer ?? false

  return user ? (
    <Menu
      width={260}
      position="bottom-end"
      transitionProps={{ transition: 'pop-top-right' }}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      withinPortal
      withArrow
      arrowOffset={18}
    >
      <Menu.Target>
        <Button p={0} variant={open ? 'light' : 'default'} radius="xl">
          <UiAvatar
            avatarUrl={user?.avatarUrl}
            name={user?.username}
            alt={user?.username ?? 'User Avatar'}
            radius={100}
            size={34}
          />
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item component={Link} to={user.profileUrl} leftSection={<IconUser size="0.9rem" stroke={1.5} />}>
          View profile
        </Menu.Item>
        <Menu.Item component={Link} to="/settings" leftSection={<IconSettings size="0.9rem" stroke={1.5} />}>
          Your settings
        </Menu.Item>
        {isAdmin || isDeveloper ? <Menu.Divider /> : null}
        {isAdmin && (
          <Menu.Item component={Link} to="/admin" leftSection={<IconShield size="0.9rem" stroke={1.5} />}>
            Admin
          </Menu.Item>
        )}{' '}
        {isDeveloper && (
          <Menu.Item component={Link} to="/admin/development" leftSection={<IconBug size="0.9rem" stroke={1.5} />}>
            Development
          </Menu.Item>
        )}
        <Menu.Divider />
        <Menu.Item
          closeMenuOnClick={false}
          onClick={() => toggleColorScheme()}
          leftSection={
            colorScheme === 'dark' ? (
              <IconSun size="0.9rem" stroke={1.5} />
            ) : (
              <IconMoonStars size="0.9rem" stroke={1.5} />
            )
          }
        >
          {colorScheme === 'dark' ? 'Light' : 'Dark'} color scheme
        </Menu.Item>
        <Menu.Item leftSection={<IconLogout size="0.9rem" stroke={1.5} />} onClick={logout}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  ) : null
}
