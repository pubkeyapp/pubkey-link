import { Table } from '@mantine/core'
import { ReactNode } from 'react'

export type FactType = [ReactNode, ReactNode] | undefined
export type FactTypes = FactType[]
export type FactTableProps = { items: FactTypes }

export function UiKeyValueTable({ items }: FactTableProps) {
  const filtered = items.filter(Boolean) as [ReactNode, ReactNode][]
  if (!filtered.length) return null
  return (
    <Table>
      <Table.Tbody>
        {filtered.map(([key, value], index) => (
          <Table.Tr key={index}>
            <Table.Td w="25%">{key}</Table.Td>
            <Table.Th>{value}</Table.Th>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  )
}
