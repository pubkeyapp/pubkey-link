import { ActionIcon, Button, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { UiStack } from '@pubkey-ui/core'
import type { ComponentType, ReactNode } from 'react'

export function UiModalButton({
  icon: Icon,
  children,
  label,
  title,
}: {
  icon?: ComponentType<{ size: number }>
  children: ReactNode
  label?: ReactNode
  title?: ReactNode
}) {
  const [opened, { close, open }] = useDisclosure(false)

  return (
    <>
      <Modal opened={opened} onClose={close} title={title}>
        <UiStack>{children}</UiStack>
      </Modal>
      {Icon ? (
        <ActionIcon color="brand" variant="light" size="sm" onClick={open}>
          <Icon size={16} />
        </ActionIcon>
      ) : (
        <Button onClick={open}>{label ?? 'Open'}</Button>
      )}
    </>
  )
}
