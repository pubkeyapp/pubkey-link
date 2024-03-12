import { AvatarProps, Group, type GroupProps, Stack, Text } from '@mantine/core'
import { Team } from '@pubkey-link/sdk'
import { UiAnchor, type UiAnchorProps } from '@pubkey-ui/core'
import { TeamUiAvatar } from './team-ui-avatar'

export function TeamUiItem({
  anchorProps,
  avatarProps,
  groupProps,
  team,
  to,
}: {
  anchorProps?: UiAnchorProps
  avatarProps?: Omit<AvatarProps, 'src'>
  groupProps?: GroupProps
  team?: Team
  to?: string | null
}) {
  if (!team) return null

  return (
    <UiAnchor to={to ?? undefined} underline="never" {...anchorProps}>
      <Group gap="sm" {...groupProps}>
        <TeamUiAvatar team={team} {...avatarProps} />
        <Stack gap={1}>
          <Text>{team?.name}</Text>
        </Stack>
      </Group>
    </UiAnchor>
  )
}
