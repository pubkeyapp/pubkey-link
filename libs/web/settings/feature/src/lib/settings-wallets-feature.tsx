import { IdentityProvider } from '@pubkey-link/sdk'
import { useAuth } from '@pubkey-link/web-auth-data-access'
import { useAppConfig } from '@pubkey-link/web-core-data-access'
import { useUserFindManyIdentity } from '@pubkey-link/web-identity-data-access'
import { IdentityUiLinkButton, IdentityUiList } from '@pubkey-link/web-identity-ui'
import { UiGroup, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'

export function SettingsWalletsFeature() {
  const { appConfig } = useAppConfig()
  const { user } = useAuth()
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
          {items.length ? (
            <IdentityUiList items={items ?? []} deleteIdentity={deleteIdentity} refresh={() => query.refetch()} />
          ) : (
            <UiInfo message="No wallets found" />
          )}
          <UiGroup justify="end">
            <IdentityUiLinkButton
              disabled={!appConfig?.authLinkProviders?.includes(IdentityProvider.Solana)}
              identities={[]}
              refresh={() => query.refetch()}
              provider={IdentityProvider.Solana}
              size="sm"
              w={210}
            />
          </UiGroup>
        </UiStack>
      )}
    </UiStack>
  )
}
