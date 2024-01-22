import { Button, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { PublicKey } from '@solana/web3.js'

export function SolanaUiAccountModalReceive({ address, ...props }: { address: PublicKey }) {
  const [opened, { close, open }] = useDisclosure(false)

  return (
    <>
      <Button onClick={open} {...props}>
        Receive
      </Button>
      <Modal opened={opened} onClose={close} title="Receive">
        <p>You can receive assets by sending them to your public key:</p>
        <code>{address.toString()}</code>
      </Modal>
    </>
  )
}
