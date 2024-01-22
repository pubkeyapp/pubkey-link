import { Button, ButtonProps, Modal, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useTransferSol } from '@pubkey-link/web-solana-data-access'
import { useWallet } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import { useState } from 'react'

export function SolanaUiAccountModalSend({ address, ...props }: ButtonProps & { address: PublicKey }) {
  const [opened, { close, open }] = useDisclosure(false)
  const wallet = useWallet()
  const mutation = useTransferSol({ address })
  const [destination, setDestination] = useState('')
  const [amount, setAmount] = useState('1')

  if (!address || !wallet.sendTransaction) {
    return <div>Wallet not connected</div>
  }

  return (
    <>
      <Button onClick={open} {...props}>
        Send
      </Button>
      <Modal opened={opened} onClose={close} title="Send">
        <TextInput
          disabled={mutation.isPending}
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <TextInput
          disabled={mutation.isPending}
          type="number"
          step="any"
          min="0"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Button
          disabled={!destination || !amount || mutation.isPending}
          onClick={() => {
            mutation
              .mutateAsync({
                destination: new PublicKey(destination),
                amount,
              })
              .then(() => close())
          }}
        >
          Send
        </Button>
      </Modal>
    </>
  )
}
