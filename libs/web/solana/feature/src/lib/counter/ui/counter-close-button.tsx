import { ActionIcon, Tooltip } from '@mantine/core'
import { IconTrash } from '@tabler/icons-react'
import { useCounterClose } from '../data-access/use-counter-close'

export function CounterCloseButton() {
  const counterClose = useCounterClose()

  return (
    <Tooltip label="Close counter">
      <ActionIcon
        size="lg"
        variant="light"
        loading={counterClose.isPending}
        color="red"
        onClick={() => counterClose.mutateAsync()}
      >
        <IconTrash size={16} />
      </ActionIcon>
    </Tooltip>
  )
}
