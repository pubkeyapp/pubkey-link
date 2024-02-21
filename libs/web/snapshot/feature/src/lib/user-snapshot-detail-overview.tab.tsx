import { Table } from '@mantine/core'
import { SnapshotItem } from '@pubkey-link/sdk'
import { useUserFindOneSnapshot } from '@pubkey-link/web-snapshot-data-access'
import { UiError, UiLoader } from '@pubkey-ui/core'

export function UserSnapshotDetailOverviewTab({ snapshotId }: { snapshotId: string }) {
  const { item, query } = useUserFindOneSnapshot({ snapshotId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Snapshot not found." />
  }

  return <SnapshotOverviewTable items={item.data ?? []} />
}

function SnapshotOverviewTable({ items }: { items: SnapshotItem[] }) {
  return (
    <Table withTableBorder>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Owner</Table.Th>
          <Table.Th>Discord ID</Table.Th>
          <Table.Th ta="right">Items</Table.Th>
          <Table.Th ta="right">Balance</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {items.map((item) => (
          <Table.Tr key={item.owner?.discordId ?? ''}>
            <Table.Td>{item.owner?.username}</Table.Td>
            <Table.Td>{item.owner?.discordId}</Table.Td>
            <Table.Td ta="right">{item.items}</Table.Td>
            <Table.Td ta="right">{item.balance}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  )
}
