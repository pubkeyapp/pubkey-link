import { Table, TableProps } from '@mantine/core'
import { ReactNode } from 'react'

export type FactType = [ReactNode, ReactNode] | undefined
export type FactTypes = FactType[]
export type FactTableProps = TableProps & { items: FactTypes }

export function UiKeyValueTable({ items, ...props }: FactTableProps) {
  const filtered = items.filter(Boolean) as [ReactNode, ReactNode][]
  if (!filtered.length) return null
  return (
    <Table {...props}>
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
