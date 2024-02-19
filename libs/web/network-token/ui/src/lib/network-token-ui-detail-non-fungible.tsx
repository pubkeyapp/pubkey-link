import { Button } from '@mantine/core'
import { NetworkToken, NetworkTokenType } from '@pubkey-link/sdk'
import { useUserFindManyNetworkAsset } from '@pubkey-link/web-network-asset-data-access'
import { UserNetworkAssetFeature } from '@pubkey-link/web-network-asset-feature'
import { UiCard, UiGroup, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'
import { Suspense, useState } from 'react'
import { NetworkAssetUiShowBalance } from './network-asset-ui-show-balance'
import { NetworkTokenUiItem } from './network-token-ui-item'

export function NetworkTokenUiDetailNonFungible({ token, username }: { token: NetworkToken; username: string }) {
  const [showDetails, setShowDetails] = useState(false)
  const { query, items, pagination } = useUserFindManyNetworkAsset({
    cluster: token.cluster,
    group: token.account,
    limit: 12,
    username,
    type: NetworkTokenType.NonFungible,
  })
  return (
    <UiCard>
      <UiGroup align="start">
        <NetworkTokenUiItem avatarProps={{ size: 'lg' }} networkToken={token} />
        <UiStack gap={0} align="end">
          <NetworkAssetUiShowBalance
            balance={pagination?.total.toString() ?? '0'}
            size="lg"
            symbol={token.symbol ?? ''}
          />
          <Button variant="subtle" size="xs" onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? 'Hide' : 'Show'} Details
          </Button>
        </UiStack>
      </UiGroup>

      <Suspense fallback={<UiLoader />}>
        {query.isLoading ? (
          <UiLoader />
        ) : items.length ? (
          showDetails ? (
            <UiStack mt="lg">
              <UserNetworkAssetFeature
                hideCluster
                cluster={token.cluster}
                group={token.account}
                username={username}
                type={NetworkTokenType.NonFungible}
              />
            </UiStack>
          ) : (
            <div />
          )
        ) : (
          <UiInfo mt="lg" message={`No assets found for ${username}.`} />
        )}
      </Suspense>
    </UiCard>
  )
}
