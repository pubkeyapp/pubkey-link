import { Button, Group, Stack, Text } from '@mantine/core'
import { ellipsify, NetworkTokenType } from '@pubkey-link/sdk'
import { useAuth } from '@pubkey-link/web-auth-data-access'
import { useUserFindManyIdentity } from '@pubkey-link/web-identity-data-access'
import { IdentityRefreshIcon, IdentityUiIcon, IdentityUiLink } from '@pubkey-link/web-identity-ui'
import { UserNetworkAssetFeature } from '@pubkey-link/web-network-asset-feature'
import { UiGrid } from '@pubkey-link/web-ui-core'
import { useUserFineOneUser } from '@pubkey-link/web-user-data-access'
import { UserUiProfile } from '@pubkey-link/web-user-ui'
import { UiCard, UiContainer, UiDebugModal, UiGroup, UiLoader, UiStack, UiTabRoutes, UiWarning } from '@pubkey-ui/core'
import { Link, useParams } from 'react-router-dom'

export function UserUserDetailFeature() {
  const { user: authUser } = useAuth()
  const { username } = useParams<{ username: string }>() as { username: string }
  const { user, query } = useUserFineOneUser({ username })
  const { items, refreshIdentity } = useUserFindManyIdentity({ username })

  if (query.isLoading) {
    return <UiLoader />
  }

  if (!user) {
    return <UiWarning message="User not found." />
  }

  const isAuthUser = authUser?.id === user.id

  return (
    <UiContainer>
      <UiGrid
        sidebar={
          <UiStack>
            <UserUiProfile
              user={user}
              action={
                isAuthUser ? (
                  <Button size="xs" variant="light" component={Link} to={`/settings`}>
                    Edit profile
                  </Button>
                ) : null
              }
            />
            {items?.map((identity) => (
              <UiCard key={identity.id} p="xs">
                <UiGroup align="start">
                  <Group>
                    <IdentityUiIcon provider={identity.provider} />
                    <Stack gap={0}>
                      <Text size="sm" fw="bold">
                        {ellipsify(identity.name ?? identity.providerId, 6)}
                      </Text>
                    </Stack>
                  </Group>
                  <Group gap={2}>
                    <IdentityRefreshIcon item={identity} onClick={refreshIdentity} />
                    <UiDebugModal data={identity} />
                    <IdentityUiLink item={identity} />
                  </Group>
                </UiGroup>
              </UiCard>
            ))}
          </UiStack>
        }
      >
        <UiStack>
          <UiTabRoutes
            tabs={[
              {
                path: 'collectibles',
                label: 'Collectibles',
                element: <UserNetworkAssetFeature username={username} type={NetworkTokenType.NonFungible} />,
              },
              {
                path: 'tokens',
                label: 'Tokens',
                element: <UserNetworkAssetFeature username={username} type={NetworkTokenType.Fungible} />,
              },
            ]}
          />
        </UiStack>
      </UiGrid>
    </UiContainer>
  )
}
