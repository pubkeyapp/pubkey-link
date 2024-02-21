import { Button, Checkbox, Group, ScrollArea, Table } from '@mantine/core'
import { SnapshotAsset } from '@pubkey-link/sdk'
import { useUserFindOneSnapshot } from '@pubkey-link/web-snapshot-data-access'
import { toastError, toastSuccess, UiError, UiGroup, UiLoader, UiStack } from '@pubkey-ui/core'
import { useState } from 'react'
import { downloadCsv, downloadJson } from './download-json'

export function UserSnapshotDetailSnapshotTab({ snapshotId }: { snapshotId: string }) {
  const { item, query } = useUserFindOneSnapshot({ snapshotId })
  const [includeMint, setIncludeMint] = useState(false)
  const [includeBalance, setIncludeBalance] = useState(false)

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Snapshot not found." />
  }

  const assets = (item.data ?? []).map((holder) => holder.assets ?? []).flat()

  function downloadAsJson() {
    if (!item) {
      toastError('No data to download')
      return
    }
    toastSuccess('Download started')
    downloadJson(item?.name ?? snapshotId, item.data)
  }
  function downloadAsCsv() {
    if (!item) {
      toastError('No data to download')
      return
    }
    const lines: string[] = [`Owner,Account${includeBalance ? ',Balance' : ''}${includeMint ? ',Mint' : ''}`]
    for (const asset of assets) {
      lines.push(
        `${asset.owner},${asset.account}${includeBalance ? `,${asset.balance}` : ''}${
          includeMint ? `,${asset.mint}` : ''
        }`,
      )
    }
    if (!lines.length) {
      toastError('No data to download')
      return
    }

    toastSuccess('Download started')
    downloadCsv(item?.name ?? snapshotId, lines)
  }

  return (
    <UiStack>
      <UiGroup>
        <Group>
          <Checkbox
            checked={includeBalance}
            onChange={() => setIncludeBalance(!includeBalance)}
            label="Include Balance"
          />
          <Checkbox checked={includeMint} onChange={() => setIncludeMint(!includeMint)} label="Include Mint" />
        </Group>
        <Group>
          <Button variant="light" onClick={downloadAsCsv}>
            Download CSV snapshot
          </Button>
          <Button variant="light" onClick={downloadAsJson}>
            Download JSON snapshot
          </Button>
        </Group>
      </UiGroup>
      <ScrollArea>
        <SnapshotTable items={assets} includeBalance={includeBalance} includeMint={includeMint} />
      </ScrollArea>
    </UiStack>
  )
}

function SnapshotTable({
  items,
  includeBalance,
  includeMint,
}: {
  includeBalance: boolean
  includeMint: boolean
  items: SnapshotAsset[]
}) {
  return (
    <Table withTableBorder>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Owner</Table.Th>
          <Table.Th>Account</Table.Th>
          {includeBalance ? <Table.Th>Balance</Table.Th> : null}
          {includeMint ? <Table.Th>Mint</Table.Th> : null}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {items.map((item, index) => (
          <Table.Tr key={index}>
            <Table.Td>{item.owner}</Table.Td>
            <Table.Td>{item.account}</Table.Td>
            {includeBalance ? <Table.Td>{item.balance}</Table.Td> : null}
            {includeMint ? <Table.Td>{item.mint}</Table.Td> : null}
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  )
}
