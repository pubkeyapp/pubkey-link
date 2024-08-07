import { Table } from '@mantine/core'
import { StatRecord } from '@pubkey-link/sdk'
import { UiCard, UiInfo, UiLoader } from '@pubkey-ui/core'
import { ReactNode } from 'react'

export function UiStatRecordTable({
  isLoading,
  items,
  title,
}: {
  isLoading: boolean
  items: StatRecord[]
  title?: ReactNode
}) {
  return (
    <UiCard title={title}>
      {isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Value</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {items.map((stat) => (
              <Table.Tr key={stat.name}>
                <Table.Td>{stat.name}</Table.Td>
                <Table.Td>{stat.value}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      ) : (
        <UiInfo message="No stats found." />
      )}
    </UiCard>
  )
}
