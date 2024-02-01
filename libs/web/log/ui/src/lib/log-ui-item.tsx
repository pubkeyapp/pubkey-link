import { Group, type GroupProps, Stack, Text } from '@mantine/core'
import { Log } from '@pubkey-link/sdk'
import { UiAnchor, type UiAnchorProps } from '@pubkey-ui/core'

export function LogUiItem({
  anchorProps,
  groupProps,
  log,
  to,
}: {
  anchorProps?: UiAnchorProps
  groupProps?: GroupProps
  log?: Log
  to?: string | null
}) {
  if (!log) return null

  return (
    <UiAnchor to={to ?? undefined} underline="never" {...anchorProps}>
      <Group gap="sm" {...groupProps}>
        <Stack gap={1}>
          <Text size="sm" fw={500}>
            {log?.message}
          </Text>
        </Stack>
      </Group>
    </UiAnchor>
  )
}
