import { AvatarProps, Group, type GroupProps, Stack, Text, TextProps } from '@mantine/core'
import { Community } from '@pubkey-link/sdk'
import { UiAnchor, type UiAnchorProps } from '@pubkey-ui/core'
import { ReactNode } from 'react'
import { CommunityUiAvatar } from './community-ui-avatar'

export function CommunityUiItem({
  anchorProps,
  avatarProps,
  groupProps,
  textProps,
  community,
  title,
  to,
}: {
  anchorProps?: UiAnchorProps
  avatarProps?: Omit<AvatarProps, 'src'>
  groupProps?: GroupProps
  textProps?: TextProps
  community?: Community
  title?: ReactNode
  to?: string | null
}) {
  if (!community) return null

  return (
    <UiAnchor to={to ?? undefined} underline="never" {...anchorProps}>
      <Group gap="sm" {...groupProps}>
        <CommunityUiAvatar size="lg" community={community} {...avatarProps} />
        <Stack gap={0}>
          <Group gap="xs">
            <Text size="xl" fw="bold" {...textProps}>
              {community?.name}
            </Text>
            {title}
          </Group>
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
