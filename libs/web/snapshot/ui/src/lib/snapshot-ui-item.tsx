import { Group, type GroupProps, Stack, Text } from '@mantine/core'
import { Snapshot } from '@pubkey-link/sdk'
import { UiAnchor, type UiAnchorProps } from '@pubkey-ui/core'

export function SnapshotUiItem({
  anchorProps,
  groupProps,
  snapshot,
  to,
}: {
  anchorProps?: UiAnchorProps
  groupProps?: GroupProps
  snapshot?: Snapshot
  to?: string | null
}) {
  if (!snapshot) return null

  return (
    <UiAnchor to={to ?? undefined} underline="never" {...anchorProps}>
      <Group gap="sm" {...groupProps}>
        <Stack gap={1}>
          <Text size="lg" fw={500}>
            {snapshot?.name}
          </Text>
        </Stack>
      </Group>
    </UiAnchor>
  )
}
