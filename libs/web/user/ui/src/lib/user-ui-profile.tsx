import { Group, Paper, PaperProps, Stack, Text, useMantineTheme } from '@mantine/core'
import { User } from '@pubkey-link/sdk'
import { UiGroup, useUiColorScheme } from '@pubkey-ui/core'

import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { UserUiAvatar } from './user-ui-avatar'

export function UserUiProfile({
  action,
  user,
  ...props
}: PaperProps & {
  action?: ReactNode
  user?: User
}) {
  const { colorScheme } = useUiColorScheme()
  const theme = useMantineTheme()
  if (!user) return null
  return (
    <Paper
      radius="md"
      withBorder
      p="lg"
      style={{
        backgroundColor: colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
      }}
      {...props}
    >
      <UiGroup align="start">
        <Group align="center">
          <UserUiAvatar user={user} size="xl" radius={100} />
          <Stack gap={0}>
            <Text component={Link} to={user.profileUrl} fz="lg" fw={500}>
              {user.username}
            </Text>
            <Text c="dimmed" fz="sm">
              {user.name}
            </Text>
            {action ? (
              <Group justify="center" mt="sm">
                {action}
              </Group>
            ) : null}
          </Stack>
        </Group>
      </UiGroup>
    </Paper>
  )
}
