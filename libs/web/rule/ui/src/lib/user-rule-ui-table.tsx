import { ActionIcon, Anchor, Badge, Group, ScrollArea } from '@mantine/core'
import { Rule } from '@pubkey-link/sdk'
import { IconPencil, IconTrash } from '@tabler/icons-react'
import { DataTable, DataTableProps } from 'mantine-datatable'
import { Link } from 'react-router-dom'

export function UserRuleUiTable({
  deleteRule,
  rules = [],
  onPageChange,
  page,
  recordsPerPage,
  totalRecords,
}: {
  deleteRule: (rule: Rule) => void
  rules: Rule[]
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
              <Anchor component={Link} to={`./${item.id}`} size="sm" fw={500}>
                {item.name}
              </Anchor>
            ),
          },
          { accessor: 'description' },
          {
            textAlign: 'center',
            accessor: 'Conditions',
            render: (item) => (
              <Badge variant="light" color={item?.conditions?.length ? 'brand' : 'yellow'}>
                {item.conditions?.length ?? 0}
              </Badge>
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
                <ActionIcon color="red" variant="light" size="sm" onClick={() => deleteRule(item)}>
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            ),
          },
        ]}
        records={rules}
      />
    </ScrollArea>
  )
}
