import { AvatarProps, Group, type GroupProps, Stack, Text, TextProps } from '@mantine/core'
import { Rule } from '@pubkey-link/sdk'
import { UiAnchor, type UiAnchorProps } from '@pubkey-ui/core'
import { RuleUiAvatar } from './rule-ui-avatar'

export function RuleUiItem({
  anchorProps,
  avatarProps,
  groupProps,
  textProps,
  rule,
  to,
}: {
  anchorProps?: UiAnchorProps
  avatarProps?: Omit<AvatarProps, 'src'>
  groupProps?: GroupProps
  textProps?: TextProps
  rule?: Rule
  to?: string | null
}) {
  if (!rule) return null

  return (
    <UiAnchor to={to ?? undefined} underline="never" {...anchorProps}>
      <Group gap="sm" {...groupProps}>
        <RuleUiAvatar rule={rule} {...avatarProps} />
        <Stack gap={1}>
          <Text size="lg" fw={500} {...textProps}>
            {rule?.name}
          </Text>
        </Stack>
      </Group>
    </UiAnchor>
  )
}
