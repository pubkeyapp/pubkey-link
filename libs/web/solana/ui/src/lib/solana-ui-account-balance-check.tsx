import { Button, Group, Text } from '@mantine/core'
import { useRequestAirdrop, useCluster, useGetBalance } from '@pubkey-link/web-solana-data-access'
import { UiWarning } from '@pubkey-ui/core'
import { PublicKey } from '@solana/web3.js'
import { IconUserOff } from '@tabler/icons-react'

export function SolanaUiAccountBalanceCheck({ address }: { address: PublicKey }) {
  const { cluster } = useCluster()
  const mutation = useRequestAirdrop({ address })
  const query = useGetBalance({ address })

  if (query.isLoading) {
    return null
  }
  if (query.isError || !query.data) {
    return (
      <UiWarning
        styles={{
          root: { display: 'flex', justifyContent: 'center' },
          title: { justifyContent: 'center' },
        }}
        title="Account not found."
        icon={<IconUserOff size={24} />}
        message={
          <Group justify="center">
            <Text>
              You are connected to <strong>{cluster.name}</strong> but your account is not found on this cluster.
            </Text>
            <Button
              variant="light"
              color="yellow"
              size="xs"
              onClick={() => mutation.mutateAsync('1').catch((err) => console.log(err))}
            >
              Request Airdrop
            </Button>
          </Group>
        }
      />
    )
  }
  return null
}
