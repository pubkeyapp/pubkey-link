import { useAuth } from '@pubkey-link/web-auth-data-access'
import { useUserFindManyIdentity } from '@pubkey-link/web-identity-data-access'
import { IdentityUiGroupList, IdentityUiLinkList } from '@pubkey-link/web-identity-ui'
import { UiLoader, UiStack } from '@pubkey-ui/core'

export function SettingsIdentityFeature() {
  const { user, appConfig } = useAuth()
  const { deleteIdentity, grouped, query } = useUserFindManyIdentity({ username: user?.username as string })

  return (
    <UiStack>
      {query.isLoading ? (
        <UiLoader />
      ) : (
        <UiStack>
          <IdentityUiGroupList grouped={grouped} deleteIdentity={deleteIdentity} refresh={() => query.refetch()} />
          <IdentityUiLinkList providers={appConfig?.authLinkProviders ?? []} refresh={() => query.refetch()} />
        </UiStack>
      )}
    </UiStack>
  )
}
