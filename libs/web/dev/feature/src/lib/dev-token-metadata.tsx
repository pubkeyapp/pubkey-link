import { Button, Group, Text } from '@mantine/core'
import { getEnumOptions, NetworkCluster } from '@pubkey-link/sdk'
import { NetworkUiGetTokenAccounts, NetworkUiGetTokenMetadata } from '@pubkey-link/web-network-ui'
import { UiAddressInput, UiSelectEnumOption } from '@pubkey-link/web-ui-core'
import { UiCard, UiDebug, UiStack } from '@pubkey-ui/core'
import { IconNetwork } from '@tabler/icons-react'
import { useState } from 'react'

export function DevTokenMetadata() {
  const [cluster, setCluster] = useState<NetworkCluster | undefined>(NetworkCluster.SolanaMainnet)
  const [address, setAddress] = useState<string>('')

  async function submit() {
    console.log('submit')
  }
  return (
    <UiCard title="Token Metadata">
      <UiStack>
        <UiAddressInput address={address} setAddress={setAddress} />
        <UiSelectEnumOption
          label="Cluster"
          required
          leftSection={
            <Text c="dimmed" display="flex">
              <IconNetwork />
            </Text>
          }
          value={cluster}
          setValue={setCluster}
          options={getEnumOptions(NetworkCluster).map((i) => ({ ...i, label: i.value.replace('Solana', 'Solana ') }))}
        />
        <Group justify="end">
          <Button disabled={!address || !cluster} onClick={submit}>
            Find Metadata
          </Button>
        </Group>
        <UiDebug data={{ address, cluster }} open hideButton />
        {address && cluster ? (
          <UiStack>
            <NetworkUiGetTokenMetadata cluster={cluster} account={address} />
            <NetworkUiGetTokenAccounts cluster={cluster} account={address} />
          </UiStack>
        ) : null}
      </UiStack>
    </UiCard>
  )
}
