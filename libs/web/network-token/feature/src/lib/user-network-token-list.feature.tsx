import { Group } from '@mantine/core'
import { NetworkCluster } from '@pubkey-link/sdk'
import { useUserFindManyNetworkToken } from '@pubkey-link/web-network-token-data-access'
import { NetworkTokenUiDetail } from './network-token-ui-detail'

import { NetworkTokenUiSelectType } from '@pubkey-link/web-network-token-ui'
import { UiSearchField } from '@pubkey-link/web-ui-core'
import { UiDebugModal, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'

export function UserNetworkTokenListFeature({ cluster, username }: { cluster: NetworkCluster; username: string }) {
  const { items, query, setSearch, type, setType } = useUserFindManyNetworkToken({
    cluster,
    username,
    limit: 100, // TODO: Figure out what to do with 100 tokens
  })

  return (
    <UiStack>
      <Group>
        <UiSearchField placeholder="Search token" setSearch={setSearch} />
        <NetworkTokenUiSelectType value={type} setValue={setType} />
        <UiDebugModal data={items} />
      </Group>
      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <UiStack>
          {items.map((token) => (
            <NetworkTokenUiDetail key={token.id} token={token} username={username} />
          ))}
        </UiStack>
      ) : (
        <UiInfo message={`No assets found for ${username}.`} />
      )}
    </UiStack>
  )
}
