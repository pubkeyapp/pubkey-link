import { ActionIcon, Button, Group, Loader, Table, Text } from '@mantine/core'
import { ellipsify } from '@pubkey-link/sdk'
import { useGetTokenAccounts } from '@pubkey-link/web-solana-data-access'
import { UiError, UiInfo, UiStack } from '@pubkey-ui/core'
import { PublicKey } from '@solana/web3.js'
import { IconRefresh } from '@tabler/icons-react'
import { useQueryClient } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { SolanaUiAccountTokenBalance } from './solana-ui-account-token-balance'

import { SolanaUiExplorerLink } from './solana-ui-explorer-link'

export function SolanaUiAccountTokens({ address }: { address: PublicKey }) {
  const [showAll, setShowAll] = useState(false)
  const query = useGetTokenAccounts({ address })
  const client = useQueryClient()
  const items = useMemo(() => {
    if (showAll) return query.data
    return query.data?.slice(0, 5)
  }, [query.data, showAll])

  return (
    <div>
      <UiStack>
        <Group justify="space-between">
          <Text size="xl">Token Accounts</Text>
          <Group>
            {query.isLoading ? (
              <Loader size="xs" type="dots" />
            ) : (
              <ActionIcon
                variant="outline"
                onClick={async () => {
                  await query.refetch()
                  await client.invalidateQueries({
                    queryKey: ['getTokenAccountBalance'],
                  })
                }}
              >
                <IconRefresh size={16} />
              </ActionIcon>
            )}
          </Group>
        </Group>
        {query.isError && <UiError title={'An error occurred'} message={`Error: ${query.error?.message.toString()}`} />}

        {query.isSuccess && (
          <div>
            {query.data.length === 0 ? (
              <UiInfo
                title="No token accounts found."
                message="Token accounts will appear here when you send or receive tokens."
              />
            ) : (
              <Table>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Public Key</Table.Th>
                    <Table.Th>Mint</Table.Th>
                    <Table.Th align="right">Balance</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {items
                    ?.sort(
                      (a, b) =>
                        b.account.data.parsed.info.tokenAmount.uiAmount -
                        a.account.data.parsed.info.tokenAmount.uiAmount,
                    )
                    .map(({ account, pubkey }) => (
                      <Table.Tr key={pubkey.toString()}>
                        <Table.Td>
                          <SolanaUiExplorerLink
                            ff="monospace"
                            label={ellipsify(pubkey.toString())}
                            path={`account/${pubkey.toString()}`}
                          />
                        </Table.Td>
                        <Table.Td>
                          <SolanaUiExplorerLink
                            ff="monospace"
                            label={ellipsify(account.data.parsed.info.mint)}
                            path={`account/${account.data.parsed.info.mint.toString()}`}
                          />
                        </Table.Td>
                        <Table.Td align="right">
                          <SolanaUiAccountTokenBalance ff="monospace" address={pubkey} />
                        </Table.Td>
                      </Table.Tr>
                    ))}

                  {(query.data?.length ?? 0) > 5 && (
                    <Table.Tr>
                      <Table.Td colSpan={4} align="center">
                        <Button onClick={() => setShowAll(!showAll)}>{showAll ? 'Show Less' : 'Show All'}</Button>
                      </Table.Td>
                    </Table.Tr>
                  )}
                </Table.Tbody>
              </Table>
            )}
          </div>
        )}
      </UiStack>
    </div>
  )
}
