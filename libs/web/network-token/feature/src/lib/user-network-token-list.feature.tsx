import { Group } from '@mantine/core'
import { UiSearchField } from '@pubkey-link/web-core-ui'
import { useUserFindManyNetworkToken } from '@pubkey-link/web-network-token-data-access'

import { NetworkTokenUiSelectType } from '@pubkey-link/web-network-token-ui'
import { UiDebugModal, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'
import { NetworkTokenUiDetail } from './network-token-ui-detail'

export function UserNetworkTokenListFeature({ username }: { username: string }) {
  const { items, query, setSearch, type, setType } = useUserFindManyNetworkToken({
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
