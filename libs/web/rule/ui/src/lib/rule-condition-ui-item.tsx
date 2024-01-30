import { Group, Text, TextProps } from '@mantine/core'
import { RuleCondition, RuleConditionType } from '@pubkey-link/sdk'
import { UiIconAvatar } from '@pubkey-link/web-ui-core'
import { UiAnchor, type UiAnchorProps } from '@pubkey-ui/core'
import { RuleConditionUiTypePopover } from './rule-condition-ui-type-popover'
import {
  getRuleConditionColor,
  getRuleConditionIconType,
  RuleConditionUiTypeTitle,
} from './rule-condition-ui-type-title'

export function RuleConditionUiItem({
  anchorProps,
  textProps,
  condition,
  to,
}: {
  anchorProps?: UiAnchorProps
  textProps?: TextProps
  condition?: RuleCondition
  to?: string | null
}) {
  if (!condition) return null

  return (
    <UiAnchor to={to ?? undefined} underline="never" {...anchorProps}>
      <Group>
        <RuleConditionUiAvatar type={condition.type} />
        <Text size="lg" fw={500} {...textProps}>
          <RuleConditionUiTypeTitle type={condition.type} />
        </Text>
        <RuleConditionUiTypePopover type={condition.type} />
      </Group>
    </UiAnchor>
  )
}

export function RuleConditionUiAvatar({ type }: { type?: RuleConditionType | null }) {
  return (
    <UiIconAvatar icon={getRuleConditionIconType(type)} name={type} size="md" color={getRuleConditionColor(type)} />
  )
}
