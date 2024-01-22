import { Button, Modal, Select, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { ClusterNetwork, useCluster } from '@pubkey-link/web-solana-data-access'
import { UiStack } from '@pubkey-ui/core'
import { useState } from 'react'

export function SolanaUiClusterModalAdd() {
  const { addCluster } = useCluster()
  const [opened, { close, open }] = useDisclosure(false)
  const [name, setName] = useState('')
  const [network, setNetwork] = useState<ClusterNetwork | undefined>()
  const [endpoint, setEndpoint] = useState('')

  return (
    <>
      <Button onClick={open}>Add Cluster</Button>
      <Modal opened={opened} onClose={close} title="Add Cluster">
        <UiStack>
          <TextInput type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <TextInput
            type="text"
            placeholder="Endpoint"
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
          />
          <Select
            value={network}
            onChange={(value) => setNetwork(value as ClusterNetwork)}
            data={[
              { value: '', label: 'Select a network' },
              { value: ClusterNetwork.Devnet, label: 'Devnet' },
              { value: ClusterNetwork.Testnet, label: 'Testnet' },
              { value: ClusterNetwork.Mainnet, label: 'Mainnet' },
            ]}
          />
          <Button
            onClick={() => {
              addCluster({ name, network, endpoint })
              close()
            }}
          >
            Save
          </Button>
        </UiStack>
      </Modal>
    </>
  )
}
