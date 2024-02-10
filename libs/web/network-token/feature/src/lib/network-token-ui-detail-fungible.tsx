import { Button, Group, Text } from '@mantine/core'
import { ellipsify, NetworkToken, NetworkTokenType } from '@pubkey-link/sdk'
import { useUserFindManyNetworkAsset } from '@pubkey-link/web-network-asset-data-access'
import { NetworkTokenUiItem } from '@pubkey-link/web-network-token-ui'
import { UiKeyValueTable } from '@pubkey-link/web-ui-core'
import { UiCard, UiGroup, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'
import { useState } from 'react'
import { NetworkAssetUiShowBalance } from './network-asset-ui-show-balance'
import { useNetworkTokenSummary } from './use-network-token-summary'

export function NetworkTokenUiDetailFungible({ token, username }: { token: NetworkToken; username: string }) {
  const [showDetails, setShowDetails] = useState(false)
  const { query, items } = useUserFindManyNetworkAsset({
    cluster: token.cluster,
    group: token.account,
    limit: 100,
    username,
    type: NetworkTokenType.Fungible,
  })

  const summary = useNetworkTokenSummary({ items })

  return (
    <UiCard>
      <UiGroup align="start">
        <NetworkTokenUiItem avatarProps={{ size: 'lg' }} networkToken={token} />
        <UiStack gap={0} align="end">
          <NetworkAssetUiShowBalance balance={summary?.total ?? '0'} size="lg" symbol={token.symbol ?? ''} />
          <Button variant="subtle" size="xs" onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? 'Hide' : 'Show'} Details
          </Button>
        </UiStack>
      </UiGroup>
      {query.isLoading ? (
        <UiLoader />
      ) : items.length ? (
        showDetails ? (
          <UiKeyValueTable
            mt="lg"
            items={items.map((item) => [
              <UiStack gap={0}>
                <Text ff="mono" fw="bold">
                  {ellipsify(item.owner, 6)}
                </Text>
                <Text ff="mono" size="xs" c="dimmed">
                  {item.account}
                </Text>
              </UiStack>,
              <Group justify="end">
                <NetworkAssetUiShowBalance mr={0} balance={item.balance ?? '0'} symbol={token.symbol ?? ''} />
              </Group>,
            ])}
          />
        ) : (
          <div />
        )
      ) : (
        <UiInfo mt="lg" message={`No assets found for ${username}.`} />
      )}
    </UiCard>
  )
}
