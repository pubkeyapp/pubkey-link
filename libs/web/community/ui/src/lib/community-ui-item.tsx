import { AvatarProps, Group, type GroupProps, Stack, Text, TextProps } from '@mantine/core'
import { Community } from '@pubkey-link/sdk'
import { UiAnchor, type UiAnchorProps } from '@pubkey-ui/core'
import { CommunityUiAvatar } from './community-ui-avatar'

export function CommunityUiItem({
  anchorProps,
  avatarProps,
  groupProps,
  textProps,
  community,
  to,
}: {
  anchorProps?: UiAnchorProps
  avatarProps?: Omit<AvatarProps, 'src'>
  groupProps?: GroupProps
  textProps?: TextProps
  community?: Community
  to?: string | null
}) {
  if (!community) return null

  return (
    <UiAnchor to={to ?? undefined} underline="never" {...anchorProps}>
      <Group gap="sm" {...groupProps}>
        <CommunityUiAvatar size="lg" community={community} {...avatarProps} />
        <Stack gap={0}>
          <Text size="xl" fw="bold" {...textProps}>
            {community?.name}
          </Text>
          {community.description ? (
            <Text size="xs" c="dimmed">
              {community?.description}
            </Text>
          ) : null}
        </Stack>
      </Group>
    </UiAnchor>
  )
}
