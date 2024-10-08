import { Group, Text, Tooltip } from '@mantine/core'
import { User } from '@pubkey-link/sdk'
import { UiAnchor } from '@pubkey-ui/core'
import { IconLock } from '@tabler/icons-react'

export function UserUiUsername({ to, user }: { to?: string | null; user: User }) {
  return (
    <Group gap={2} align="center">
      <UiAnchor to={to ?? undefined} underline="never">
        <Text c="dimmed" fz="md">
          {user.username}
        </Text>
      </UiAnchor>
      {user.private ? (
        <Tooltip label="Private profile">
          <Text c="dimmed" span display="flex">
            <IconLock size={14} />
          </Text>
        </Tooltip>
      ) : null}
    </Group>
  )
}
