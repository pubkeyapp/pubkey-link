import { Community, NetworkToken } from '@pubkey-link/sdk'
import { useAuth } from '@pubkey-link/web-auth-data-access'
import { NetworkTokenUiDetail } from '@pubkey-link/web-network-token-feature'
import { useUserFindManyRole } from '@pubkey-link/web-role-data-access'
import { RoleUiList } from '@pubkey-link/web-role-ui'
import { UiCard, UiLoader, UiStack, UiWarning } from '@pubkey-ui/core'

export function CommunityDashboardMemberCardRoles({ community }: { community: Community }) {
  const { user } = useAuth()
  const { items, query } = useUserFindManyRole({ communityId: community.id })

  const filtered = items?.filter((item) => (item?.conditions ?? [])?.length > 0)

  const tokens = items.map((item) => item.conditions?.map((condition) => condition.token)).flat()

  // Get the unique tokens based on the `account` property
  const uniqueTokens = Array.from(new Set(tokens.map((token) => token?.account)))
    .map((account) => tokens.find((token) => token?.account === account))
    .filter((token) => token !== undefined)

  return (
    <UiStack>
      {query.isLoading ? (
        <UiLoader />
      ) : filtered?.length ? (
        <UiStack>
          <UiCard title="Community Assets">
            {user?.username && uniqueTokens?.length ? (
              <UiStack>
                {((uniqueTokens ?? []) as NetworkToken[]).map((token) => (
                  <NetworkTokenUiDetail key={token.id} token={token} username={user.username!} />
                ))}
              </UiStack>
            ) : null}
          </UiCard>
          <UiCard title="Community Roles">
            <RoleUiList mt="xs" roles={filtered ?? []} />
          </UiCard>
        </UiStack>
      ) : (
        <UiWarning title="No roles found." message="This community does not have any roles." />
      )}
    </UiStack>
  )
}
