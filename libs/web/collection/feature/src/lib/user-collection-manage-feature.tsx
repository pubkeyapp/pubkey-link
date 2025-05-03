import { Group, NavLink, SimpleGrid, Stack, Switch, Text } from '@mantine/core'
import { NetworkTokenType } from '@pubkey-link/sdk'
import {
  useUserCollectionCreate,
  useUserCollectionDelete,
  useUserCollectionFindMany,
} from '@pubkey-link/web-collection-data-access'
import { useUserFindOneCommunity } from '@pubkey-link/web-community-data-access'
import { useUserFindManyNetworkToken } from '@pubkey-link/web-network-token-data-access'
import { NetworkTokenUiAvatar } from '@pubkey-link/web-network-token-ui'
import { UiBack, UiLoader, UiPage } from '@pubkey-ui/core'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export function UserCollectionManageFeature({ communityId }: { communityId: string }) {
  const navigate = useNavigate()
  const { data: collections, isLoading } = useUserCollectionFindMany({ communityId })
  const collectionCreateMutation = useUserCollectionCreate({ communityId })
  const collectionDeleteMutation = useUserCollectionDelete()
  const { item, isAdmin, isLoading: communityLoading } = useUserFindOneCommunity({ communityId })
  const { items: tokens, isLoading: tokensLoading } = useUserFindManyNetworkToken({
    limit: 999,
    type: NetworkTokenType.NonFungible,
  })

  if (isLoading || communityLoading || tokensLoading) {
    return <UiLoader />
  }

  if (!isAdmin) {
    navigate(`/${item?.id}`)
    return null
  }
  return (
    <UiPage title={`Manage Collections`} leftAction={<UiBack />}>
      <SimpleGrid cols={{ base: 1, md: 3 }}>
        {(tokens ?? []).map((token) => {
          const collection = collections?.find((collection) => collection.token?.account === token.account)
          const hasCollection = !!collection
          return (
            <NavLink
              active={hasCollection}
              variant={hasCollection ? 'light' : 'subtle'}
              key={token.id}
              label={
                <Stack gap={4} align="start">
                  <Group gap="xs" wrap="nowrap">
                    <Text size="lg" fw={500}>
                      {token?.name}
                    </Text>
                  </Group>
                </Stack>
              }
              leftSection={<NetworkTokenUiAvatar networkToken={token} />}
              rightSection={
                <Switch
                  size="sm"
                  checked={hasCollection}
                  onChange={() => {
                    if (hasCollection) {
                      collectionDeleteMutation.mutate(collection.id)
                    } else {
                      collectionCreateMutation.mutate({ tokenId: token.id })
                    }
                  }}
                />
              }
            />
          )
        })}
      </SimpleGrid>
    </UiPage>
  )
}
