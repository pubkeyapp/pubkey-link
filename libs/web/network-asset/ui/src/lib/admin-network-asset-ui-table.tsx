import { ActionIcon, Group, ScrollArea } from '@mantine/core'
import { NetworkAsset } from '@pubkey-link/sdk'
import { IconPencil, IconTrash } from '@tabler/icons-react'
import { DataTable, DataTableProps } from 'mantine-datatable'
import { Link } from 'react-router-dom'

import { NetworkAssetUiListItem } from './network-asset-ui-list-item'

export function AdminNetworkAssetUiTable({
  deleteNetworkAsset,
  networkAssets = [],
  onPageChange,
  page,
  recordsPerPage,
  totalRecords,
}: {
  deleteNetworkAsset: (networkAsset: NetworkAsset) => void
  networkAssets: NetworkAsset[]
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
              <Group>
                <NetworkAssetUiListItem networkAsset={item} to={`./${item.id}`} />
              </Group>
            ),
          },
          { accessor: 'type' },
          {
            accessor: 'actions',
            title: 'Actions',
            textAlign: 'right',
            render: (item) => (
              <Group gap="xs" justify="right">
                <ActionIcon color="brand" variant="light" size="sm" component={Link} to={`./${item.id}/settings`}>
                  <IconPencil size={16} />
                </ActionIcon>
                <ActionIcon color="red" variant="light" size="sm" onClick={() => deleteNetworkAsset(item)}>
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            ),
          },
        ]}
        records={networkAssets}
      />
    </ScrollArea>
  )
}
