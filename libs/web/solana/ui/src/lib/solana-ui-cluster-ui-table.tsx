import { Anchor, Button, Table, Text } from '@mantine/core'
import { useCluster } from '@pubkey-link/web-solana-data-access'
import { IconTrash } from '@tabler/icons-react'

export function SolanaUiClusterUiTable() {
  const { clusters, setCluster, deleteCluster } = useCluster()
  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Name / Network / Endpoint</Table.Th>
          <Table.Th style={{ textAlign: 'right' }}>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {clusters.map((item) => (
          <Table.Tr key={item.name}>
            <Table.Td>
              <Text size="lg">
                {item?.active ? (
                  item.name
                ) : (
                  <Anchor component="button" title="Select cluster" onClick={() => setCluster(item)}>
                    {item.name}
                  </Anchor>
                )}
              </Text>
              <Text size="xs">Network: {item.network ?? 'custom'}</Text>
              <div>{item.endpoint}</div>
            </Table.Td>
            <Table.Td align="right">
              <Button
                disabled={item?.active}
                onClick={() => {
                  if (!window.confirm('Are you sure?')) return
                  deleteCluster(item)
                }}
              >
                <IconTrash size={16} />
              </Button>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  )
}
