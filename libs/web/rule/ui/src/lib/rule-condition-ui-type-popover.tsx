import { RuleConditionType } from '@pubkey-link/sdk'
import { useDisclosure } from '@mantine/hooks'
import { ActionIcon, Popover } from '@mantine/core'
import { RuleConditionUiInfo } from './rule-condition-ui-info'
import { IconQuestionMark } from '@tabler/icons-react'

export function RuleConditionUiTypePopover({ type }: { type: RuleConditionType }) {
  const [opened, { close, open }] = useDisclosure(false)
  return (
    <Popover width={200} position="bottom" withArrow shadow="md" opened={opened}>
      <Popover.Target>
        <ActionIcon
          size="sm"
          radius="xl"
          onMouseEnter={open}
          onMouseLeave={close}
          variant="light"
          aria-label="Show condition info"
        >
          <IconQuestionMark />
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown style={{ pointerEvents: 'none' }} w={300} p={0}>
        <RuleConditionUiInfo type={type} />
      </Popover.Dropdown>
    </Popover>
  )
}
