import { Button, ButtonProps, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { ReactNode } from 'react'
import { IdentityUiSolanaWizard } from './identity-ui-solana-wizard'

export function IdentityUiSolanaWizardModal({
  children,
  sign,
  ...props
}: ButtonProps & {
  children: ReactNode
  sign: (useLedger: boolean) => Promise<boolean>
}) {
  const [opened, { open, close }] = useDisclosure(false)
  return (
    <>
      <Modal opened={opened} onClose={close} size="xl" zIndex={1} title="Verify your wallet" centered>
        <IdentityUiSolanaWizard
          p="lg"
          sign={(useLedger) =>
            sign(useLedger)
              .then(() => close())
              .then(() => true)
          }
        />
      </Modal>
      <Button {...props} onClick={open}>
        {children}
      </Button>
    </>
  )
}
