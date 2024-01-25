import { AvatarProps, Group, type GroupProps, Stack, Text } from '@mantine/core'
import { Identity } from '@pubkey-link/sdk'
import { UiAnchor, type UiAnchorProps } from '@pubkey-ui/core'
import { IdentityUiAvatar } from './identity-ui-avatar'
import { IdentityUiProviderTag } from './identity-ui-provider-tag'

export function IdentityUiItem({
  anchorProps,
  avatarProps,
  groupProps,
  identity,
  to,
}: {
  anchorProps?: UiAnchorProps
  avatarProps?: Omit<AvatarProps, 'src'>
  groupProps?: GroupProps
  identity?: Identity
  to?: string | null
}) {
  if (!identity) return null

  return (
    <UiAnchor to={to ?? undefined} underline="never" {...anchorProps}>
      <Group gap="sm" {...groupProps}>
        <IdentityUiAvatar item={identity} {...avatarProps} />
        <Stack gap={1}>
          <Text size="lg" fw="bold">
            {identity?.name}
          </Text>
          <IdentityUiProviderTag provider={identity.provider} />
        </Stack>
      </Group>
    </UiAnchor>
  )
}