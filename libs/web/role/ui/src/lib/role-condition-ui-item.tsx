import { Group, Stack, Text, TextProps } from '@mantine/core'
import {
  getNetworkTokenTypeColor,
  getNetworkTokenTypeDescription,
  getNetworkTokenTypeTitle,
} from '@pubkey-link/resolvers'
import { NetworkTokenType } from '@pubkey-link/sdk'
import { UiIconAvatar } from '@pubkey-link/web-ui-core'
import { UiAnchor, type UiAnchorProps } from '@pubkey-ui/core'
import { getRoleConditionIconType } from './get-role-condition-icon-type'

export function RoleConditionUiItem({
  anchorProps,
  textProps,
  type,
  to,
}: {
  anchorProps?: UiAnchorProps
  textProps?: TextProps
  type?: NetworkTokenType
  to?: string | null
}) {
  if (!type) return null

  return (
    <UiAnchor to={to ?? undefined} underline="never" {...anchorProps}>
      <Group gap="sm">
        <RoleConditionUiAvatar type={type} />
        <Stack gap={0}>
          <Text size="lg" fw={500} {...textProps}>
            {getNetworkTokenTypeTitle(type)}
          </Text>
          <Text size="xs" c="dimmed">
            {getNetworkTokenTypeDescription(type)}
          </Text>
        </Stack>
      </Group>
    </UiAnchor>
  )
}

export function RoleConditionUiAvatar({ type }: { type?: NetworkTokenType | null }) {
  return (
    <UiIconAvatar icon={getRoleConditionIconType(type)} name={type} size="md" color={getNetworkTokenTypeColor(type)} />
  )
}
