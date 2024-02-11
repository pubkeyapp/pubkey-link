import { AvatarProps, Group, type GroupProps, Stack, Text } from '@mantine/core'
import { DiscordRole, DiscordServer } from '@pubkey-link/sdk'
import { UiAnchor, type UiAnchorProps } from '@pubkey-ui/core'
import { IconBrandDiscord } from '@tabler/icons-react'
import { UiAvatar } from './ui-avatar'
import { UiDiscordRoleColor } from './ui-discord-role-color'

export function UiDiscordServerItem({
  anchorProps,
  avatarProps,
  groupProps,
  server,
  role,
  to,
}: {
  anchorProps?: UiAnchorProps
  avatarProps?: Omit<AvatarProps, 'src'>
  groupProps?: GroupProps
  server?: DiscordServer | null
  role?: DiscordRole | null
  to?: string | null
}) {
  if (!server) return null

  return (
    <UiAnchor to={to ?? undefined} underline="never" {...anchorProps}>
      <Group gap="sm" {...groupProps}>
        <UiAvatar avatarUrl={server?.icon} name={server?.name} {...avatarProps} />
        <Stack gap={0}>
          <Text size="lx" fw="bold" span>
            {server?.name}
          </Text>
          {role ? (
            <UiDiscordRoleColor size="xs" color={role?.color}>
              {role?.name}
            </UiDiscordRoleColor>
          ) : (
            <Text size="sm" c="dimmed" span>
              <Group gap={4}>
                <IconBrandDiscord size={16} />
                Discord Server
              </Group>
            </Text>
          )}
        </Stack>
      </Group>
    </UiAnchor>
  )
}
