import { Table } from '@mantine/core'
import { filterTokenAccounts, sortTokenAccounts, TokenAccountFilter } from '@pubkey-link/web-cache-data-access'
import { DAS } from 'helius-sdk'
import React from 'react'

export function CacheUiTokenAccountTable({ items, state }: { items: DAS.TokenAccounts[]; state: TokenAccountFilter }) {
  const filteredItems = filterTokenAccounts(items, state)
  const sortedItems = sortTokenAccounts(filteredItems, 'desc')
  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Owner</Table.Th>
          <Table.Th>Address</Table.Th>
          <Table.Th ta="right">Amount</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {sortedItems.map((item) => (
          <Table.Tr key={item.address}>
            <Table.Td ff="monospace">{item.owner}</Table.Td>
            <Table.Td ff="monospace">{item.address}</Table.Td>
            <Table.Td ff="monospace" ta="right">
              {item.amount}
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  )
}
