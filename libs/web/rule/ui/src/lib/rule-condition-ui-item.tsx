import { Group, Text, TextProps } from '@mantine/core'
import { RuleCondition } from '@pubkey-link/sdk'
import { UiAnchor, type UiAnchorProps } from '@pubkey-ui/core'
import { getRuleConditionIconType, RuleConditionUiTypeTitle } from './rule-condition-ui-type-title'
import { RuleConditionUiTypePopover } from './rule-condition-ui-type-popover'
import { UiIconAvatar } from '@pubkey-link/web-ui-core'

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
        <RuleConditionUiAvatar item={condition} />
        <Text size="lg" fw={500} {...textProps}>
          <RuleConditionUiTypeTitle type={condition.type} />
        </Text>
        <RuleConditionUiTypePopover type={condition.type} />
      </Group>
    </UiAnchor>
  )
}

export function RuleConditionUiAvatar({ item }: { item?: RuleCondition | null }) {
  return <UiIconAvatar icon={getRuleConditionIconType(item?.type)} name={item?.type} size="md" />
}
