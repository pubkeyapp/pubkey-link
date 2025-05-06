import { AvatarProps, Group, type GroupProps, Stack, Text } from '@mantine/core'
import { Resolver } from '@pubkey-link/sdk'
import { UiAnchor, type UiAnchorProps } from '@pubkey-ui/core'
import { ResolverUiAvatar } from './resolver-ui-avatar'

export function ResolverUiItem({
  anchorProps,
  avatarProps,
  groupProps,
  resolver,
  to,
}: {
  anchorProps?: UiAnchorProps
  avatarProps?: Omit<AvatarProps, 'src'>
  groupProps?: GroupProps
  resolver?: Resolver
  to?: string | null
}) {
  if (!resolver) return null

  return (
    <UiAnchor to={to ?? undefined} underline="never" {...anchorProps}>
      <Group gap="sm" {...groupProps}>
        <ResolverUiAvatar resolver={resolver} {...avatarProps} />
        <Stack gap={1}>
          <Text size="sm" fw={500}>
            {resolver?.name}
          </Text>
        </Stack>
      </Group>
    </UiAnchor>
  )
}
