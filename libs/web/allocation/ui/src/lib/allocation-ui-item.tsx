import { AvatarProps, Group, type GroupProps, Stack, Text } from '@mantine/core'
import { Allocation } from '@pubkey-link/sdk'
import { UiAnchor, type UiAnchorProps } from '@pubkey-ui/core'
import { AllocationUiAvatar } from './allocation-ui-avatar'

export function AllocationUiItem({
  anchorProps,
  avatarProps,
  groupProps,
  allocation,
  to,
}: {
  anchorProps?: UiAnchorProps
  avatarProps?: Omit<AvatarProps, 'src'>
  groupProps?: GroupProps
  allocation?: Allocation
  to?: string | null
}) {
  if (!allocation) return null

  return (
    <UiAnchor to={to ?? undefined} underline="never" {...anchorProps}>
      <Group gap="sm" {...groupProps}>
        <AllocationUiAvatar allocation={allocation} {...avatarProps} />
        <Stack gap={1}>
          <Text size="sm" fw={500}>
            {allocation?.name}
          </Text>
        </Stack>
      </Group>
    </UiAnchor>
  )
}
