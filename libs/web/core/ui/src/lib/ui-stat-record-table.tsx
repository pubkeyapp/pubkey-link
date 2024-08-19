import { Button, Group, Table } from '@mantine/core'
import { StatRecord } from '@pubkey-link/sdk'
import { UiCard, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'
import { ReactNode, useState } from 'react'

export function UiStatRecordTable({
  isLoading,
  items,
  title,
}: {
  isLoading: boolean
  items: StatRecord[]
  title?: ReactNode
}) {
  const [showAll, setShowAll] = useState(false)
  const limit = showAll ? items.length : 10

  return (
    <UiCard title={title}>
      {isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <UiStack>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Name</Table.Th>
                <Table.Th>Value</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {items.slice(0, limit).map((stat) => (
                <Table.Tr key={stat.name}>
                  <Table.Td>{stat.name}</Table.Td>
                  <Table.Td>{stat.value}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
          {items.length > limit && (
            <Group justify="center">
              <Button variant="light" onClick={() => setShowAll(!showAll)}>
                {showAll ? 'Show Less' : 'Show All'}
              </Button>
            </Group>
          )}
        </UiStack>
      ) : (
        <UiInfo message="No stats found." />
      )}
    </UiCard>
  )
}
