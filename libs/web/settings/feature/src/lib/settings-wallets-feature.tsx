import { IdentityProvider } from '@pubkey-link/sdk'
import { useAuth } from '@pubkey-link/web-auth-data-access'
import { useUserFindManyIdentity } from '@pubkey-link/web-identity-data-access'
import { IdentityUiLinkButton, IdentityUiList } from '@pubkey-link/web-identity-ui'
import { UiCardTitle, UiGroup, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'

export function SettingsWalletsFeature() {
  const { user, appConfig } = useAuth()
  const { deleteIdentity, items, query } = useUserFindManyIdentity({
    provider: IdentityProvider.Solana,
    username: user?.username as string,
  })

  return (
    <UiStack>
      {query.isLoading ? (
        <UiLoader />
      ) : (
        <UiStack>
          <UiGroup>
            <UiCardTitle>Wallets</UiCardTitle>
            <IdentityUiLinkButton
              disabled={!appConfig?.authLinkProviders?.includes(IdentityProvider.Solana)}
              identities={[]}
              refresh={() => query.refetch()}
              provider={IdentityProvider.Solana}
              size="sm"
              w={210}
            />
          </UiGroup>
          {items.length ? (
            <IdentityUiList items={items ?? []} deleteIdentity={deleteIdentity} refresh={() => query.refetch()} />
          ) : (
            <UiInfo message="No wallets found" />
          )}
        </UiStack>
      )}
    </UiStack>
  )
}
