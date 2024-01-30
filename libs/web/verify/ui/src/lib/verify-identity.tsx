import { IdentityProvider } from '@pubkey-link/sdk'
import { useAnonFindUserByIdentity } from '@pubkey-link/web-verify-data-access'
import { UiCard, UiDebugModal, UiLoader, UiStack, UiWarning } from '@pubkey-ui/core'
import { Group } from '@mantine/core'
import { UserUiItem } from '@pubkey-link/web-user-ui'
import { IdentityUiItem } from '@pubkey-link/web-identity-ui'

export function VerifyIdentity({
  //
  provider,
  providerId,
}: {
  provider: IdentityProvider
  providerId: string
}) {
  const query = useAnonFindUserByIdentity({
    provider,
    providerId,
  })

  const item = query.data?.item

  return (
    <UiCard
      title={
        <Group>
          {provider} {providerId}
        </Group>
      }
    >
      {query.isLoading ? (
        <UiLoader />
      ) : item ? (
        <UiStack>
          <UserUiItem user={item} />
          {item.identities?.map((identity) => (
            <IdentityUiItem key={identity.id} identity={identity} />
          ))}
          <UiDebugModal data={item} />
        </UiStack>
      ) : (
        <UiWarning title="Not found." message={`No user found with ${provider} ${providerId}`} />
      )}
    </UiCard>
  )
}
