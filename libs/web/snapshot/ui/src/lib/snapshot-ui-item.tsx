import { AvatarProps, Group, type GroupProps, Stack, Text } from '@mantine/core'
import { Snapshot } from '@pubkey-link/sdk'
import { UiAnchor, type UiAnchorProps } from '@pubkey-ui/core'
import { SnapshotUiAvatar } from './snapshot-ui-avatar'

export function SnapshotUiItem({
  anchorProps,
  avatarProps,
  groupProps,
  snapshot,
  to,
}: {
  anchorProps?: UiAnchorProps
  avatarProps?: Omit<AvatarProps, 'src'>
  groupProps?: GroupProps
  snapshot?: Snapshot
  to?: string | null
}) {
  if (!snapshot) return null

  return (
    <UiAnchor to={to ?? undefined} underline="never" {...anchorProps}>
      <Group gap="sm" {...groupProps}>
        <SnapshotUiAvatar snapshot={snapshot} {...avatarProps} />
        <Stack gap={1}>
          <Text size="sm" fw={500}>
            {snapshot?.name}
          </Text>
        </Stack>
      </Group>
    </UiAnchor>
  )
}
