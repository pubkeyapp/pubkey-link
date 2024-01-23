import { AvatarProps, Group, type GroupProps, Stack, Text } from '@mantine/core'
import { CommunityMember } from '@pubkey-link/sdk'
import { UiAnchor, type UiAnchorProps } from '@pubkey-ui/core'
import { CommunityMemberUiAvatar } from './community-member-ui-avatar'

export function CommunityMemberUiItem({
  anchorProps,
  avatarProps,
  groupProps,
  communityMember,
  to,
}: {
  anchorProps?: UiAnchorProps
  avatarProps?: Omit<AvatarProps, 'src'>
  groupProps?: GroupProps
  communityMember?: CommunityMember
  to?: string | null
}) {
  if (!communityMember) return null

  return (
    <UiAnchor to={to ?? undefined} underline="never" {...anchorProps}>
      <Group gap="sm" {...groupProps}>
        <CommunityMemberUiAvatar communityMember={communityMember} {...avatarProps} />
        <Stack gap={1}>
          <Text size="sm" fw={500}>
            {communityMember?.role}
          </Text>
        </Stack>
      </Group>
    </UiAnchor>
  )
}
