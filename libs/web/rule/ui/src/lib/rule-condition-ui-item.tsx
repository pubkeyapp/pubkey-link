import { Group, Stack, Text, TextProps } from '@mantine/core'
import {
  getRuleConditionColor,
  getRuleConditionTypeDescription,
  getRuleConditionTypeTitle,
} from '@pubkey-link/resolvers'
import { RuleConditionType } from '@pubkey-link/sdk'
import { UiIconAvatar } from '@pubkey-link/web-ui-core'
import { UiAnchor, type UiAnchorProps } from '@pubkey-ui/core'
import { getRuleConditionIconType } from './get-rule-condition-icon-type'

export function RuleConditionUiItem({
  anchorProps,
  textProps,
  type,
  to,
}: {
  anchorProps?: UiAnchorProps
  textProps?: TextProps
  type?: RuleConditionType
  to?: string | null
}) {
  if (!type) return null

  return (
    <UiAnchor to={to ?? undefined} underline="never" {...anchorProps}>
      <Group gap="sm">
        <RuleConditionUiAvatar type={type} />
        <Stack gap={0}>
          <Text size="lg" fw={500} {...textProps}>
            {getRuleConditionTypeTitle(type)}
          </Text>
          <Text size="xs" c="dimmed">
            {getRuleConditionTypeDescription(type)}
          </Text>
        </Stack>
      </Group>
    </UiAnchor>
  )
}

export function RuleConditionUiAvatar({ type }: { type?: RuleConditionType | null }) {
  return (
    <UiIconAvatar icon={getRuleConditionIconType(type)} name={type} size="md" color={getRuleConditionColor(type)} />
  )
}
