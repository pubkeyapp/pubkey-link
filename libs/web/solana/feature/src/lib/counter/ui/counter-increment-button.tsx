import { ActionIcon, Tooltip } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import { useCounterIncrement } from '../data-access/use-counter-increment'

export function CounterIncrementButton() {
  const counterIncrement = useCounterIncrement()

  return (
    <Tooltip label="Increment counter">
      <ActionIcon
        size="xl"
        variant="light"
        loading={counterIncrement.isPending}
        onClick={() => counterIncrement.mutateAsync()}
      >
        <IconPlus />
      </ActionIcon>
    </Tooltip>
  )
}
