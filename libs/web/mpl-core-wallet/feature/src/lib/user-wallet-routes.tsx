import { Link, useParams, useRoutes } from 'react-router-dom'
import { useUserFindOneNetworkToken } from '@pubkey-link/web-network-token-data-access'
import { UiDebug, UiLoader } from '@pubkey-ui/core'
import { NetworkTokenUiItem } from '@pubkey-link/web-network-token-ui'
import { IdentityProvider, NetworkAsset, NetworkCluster, NetworkToken, User } from '@pubkey-link/sdk'
import { useAuth } from '@pubkey-link/web-auth-data-access'
import { useUserFindManyNetworkAsset, useUserFindOneNetworkAsset } from '@pubkey-link/web-network-asset-data-access'
import { NetworkAssetUiListItem } from '@pubkey-link/web-network-asset-ui'
import { Box, Flex, Grid, NavLink, NavLinkProps, Stack } from '@mantine/core'

export default function UserWalletRoutes() {
  return useRoutes([
    { index: true, element: <div>LIST CORE COLLECTIONS</div> },
    { path: ':group/:asset?', element: <UserWalletDetails /> },
  ])
}

function UserWalletDetails() {
  const { user } = useAuth()
  const params = useParams() as { asset?: string; group: string }
  const { query, item: group } = useUserFindOneNetworkToken({ account: params.group })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!group) {
    return <div> No found :(</div>
  }
  if (!user) {
    return <div> No user :( </div>
  }

  return (
    <Flex gap={2} direction="column" justify="space-between" h="100%">
      <Box px="md">
        <NetworkTokenUiItem to={'.'} details={false} networkToken={group} />
      </Box>
      <Box style={{ flex: 1, overflow: 'hidden' }}>
        <UserWalletDetailsForToken
          basePath={`/wallet/${params.group}`}
          user={user}
          token={group}
          assetId={params.asset}
        />
      </Box>
    </Flex>
  )
}

function UserWalletDetailsForToken({
  assetId,
  basePath,
  token,
  user,
}: {
  basePath: string
  assetId?: string
  token: NetworkToken
  user: User
}) {
  const solanaIdentityIds =
    user.identities?.filter((i) => i.provider === IdentityProvider.Solana)?.map((i) => i.providerId) ?? []

  const { items } = useUserFindManyNetworkAsset({
    cluster: token.cluster,
    group: token.account,
    limit: 100,
    type: token.type,
    username: user.username ?? '',
  })

  const filtered = (items ?? []).filter((i) => solanaIdentityIds.includes(i.owner))

  return (
    <Grid
      styles={{
        root: { height: '100%' },
        inner: { height: '100%', overflow: 'auto' },
        col: { height: '100%', overflow: 'auto' },
      }}
    >
      <Grid.Col span={3}>
        <Stack>
          {filtered.map((asset) => (
            <NetworkAssetUiNavLink
              active={asset.account === assetId}
              to={`${basePath}/${asset.account}`}
              key={asset.id}
              asset={asset}
            />
          ))}
        </Stack>
      </Grid.Col>
      <Grid.Col span={9}>
        <div>
          {assetId ? (
            <UserWalletAssetDetails account={assetId} cluster={token.cluster} />
          ) : (
            <div>Select an asset from the sidebar</div>
          )}
        </div>
      </Grid.Col>
    </Grid>
  )
}

function NetworkAssetUiNavLink({ asset, to, ...props }: NavLinkProps & { asset: NetworkAsset; to: string }) {
  return <NavLink component={Link} to={to} label={<NetworkAssetUiListItem networkAsset={asset} />} {...props} />
}
function UserWalletAssetDetails({ account, cluster }: { account: string; cluster: NetworkCluster }) {
  const { query, item } = useUserFindOneNetworkAsset({ account, cluster })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <div> No found :(</div>
  }

  return (
    <div>
      <UiDebug open data={item} />
    </div>
  )
}
