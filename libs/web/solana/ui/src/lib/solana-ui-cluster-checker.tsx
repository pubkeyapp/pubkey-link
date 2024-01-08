import { Button, Group, Text } from '@mantine/core'
import { useCluster } from '@pubkey-link/web-solana-data-access'
import { UiWarning } from '@pubkey-ui/core'
import { useConnection } from '@solana/wallet-adapter-react'
import { IconNetworkOff } from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'
import { ReactNode } from 'react'

export function SolanaUiClusterChecker({ children }: { children: ReactNode }) {
  const { cluster } = useCluster()
  const { connection } = useConnection()

  const query = useQuery({
    queryKey: ['version', { cluster, endpoint: connection.rpcEndpoint }],
    queryFn: () => connection.getVersion(),
    retry: 1,
  })
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
        title="Error connecting to cluster"
        icon={<IconNetworkOff />}
        message={
          <Group justify="center">
            <Text>
              Error connecting to cluster <strong>{cluster.name}</strong>
            </Text>
            <Button variant="light" color="yellow" size="xs" onClick={() => query.refetch()}>
              Refresh
            </Button>
          </Group>
        }
      />
    )
  }
  return children
}
