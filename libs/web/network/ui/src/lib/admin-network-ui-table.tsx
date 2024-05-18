import { ActionIcon, Group, ScrollArea } from '@mantine/core'
import { Network } from '@pubkey-link/sdk'
import { IconPencil, IconTrash } from '@tabler/icons-react'
import { DataTable, DataTableProps } from 'mantine-datatable'
import { Link } from 'react-router-dom'
import { NetworkUiItem } from './network-ui-item'
import { NetworkUiSyncBadge } from './network-ui-sync-badge'

export function AdminNetworkUiTable({
  deleteNetwork,
  networks = [],
  onPageChange,
  page,
  recordsPerPage,
  totalRecords,
}: {
  deleteNetwork: (network: Network) => void
  networks: Network[]
  page: DataTableProps['page']
  totalRecords: DataTableProps['totalRecords']
  recordsPerPage: DataTableProps['recordsPerPage']
  onPageChange: (page: number) => void
}) {
  return (
    <ScrollArea>
      <DataTable
        borderRadius="sm"
        withTableBorder
        shadow="xs"
        onPageChange={onPageChange}
        page={page ?? 1}
        recordsPerPage={recordsPerPage ?? 10}
        totalRecords={totalRecords ?? 1}
        columns={[
          {
            accessor: 'name',
            render: (item) => (
              <NetworkUiItem network={item} to={`./${item.id}`} title={<NetworkUiSyncBadge network={item} />} />
            ),
          },
          {
            accessor: 'actions',
            title: 'Actions',
            textAlign: 'right',
            render: (item) => (
              <Group gap="xs" justify="right">
                <ActionIcon color="brand" variant="light" size="sm" component={Link} to={`./${item.id}/settings`}>
                  <IconPencil size={16} />
                </ActionIcon>
                <ActionIcon color="red" variant="light" size="sm" onClick={() => deleteNetwork(item)}>
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            ),
          },
        ]}
        records={networks}
      />
    </ScrollArea>
  )
}
