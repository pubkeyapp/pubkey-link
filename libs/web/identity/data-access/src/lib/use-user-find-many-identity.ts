import { Identity, IdentityProvider, type UserFindManyIdentityInput, UserUpdateIdentityInput } from '@pubkey-link/sdk'
import { useSdk } from '@pubkey-link/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export function useUserFindManyIdentity({ username, provider }: { username: string; provider?: IdentityProvider }) {
  const sdk = useSdk()
  const input: UserFindManyIdentityInput = useMemo(() => ({ username, provider }), [username, provider])
  const query = useQuery({
    queryKey: ['user', 'find-many-identity', input],
    queryFn: () => sdk.userFindManyIdentity({ input }).then((res) => res?.data),
  })

  const grouped: { provider: IdentityProvider; items: Identity[] }[] = useMemo(() => {
    if (!query.data) {
      return []
    }
    const items = query.data?.items ?? []
    return items.reduce(
      (acc, item) => {
        const existing = acc.find((x) => x.provider === item.provider)
        if (existing) {
          existing.items.push(item)
        } else {
          acc.push({ provider: item.provider, items: [item] })
        }
        return acc
      },
      [
        // ...(appConfig?.authLinkProviders
        //   ?.sort((a, b) => a.toString().localeCompare(b.toString()))
        //   .map((provider) => ({ provider, items: [] })) ?? []),
      ] as { provider: IdentityProvider; items: Identity[] }[],
    )
  }, [query.data])

  const items = query.data?.items ?? []

  return {
    grouped,
    items,
    query,
    async deleteIdentity(identityId: string) {
      if (!window.confirm('Are you sure?')) {
        return
      }
      sdk
        .userDeleteIdentity({ identityId })
        .then(() => {
          toastSuccess('Identity deleted')
        })
        .catch((res) => {
          toastError({ title: 'Error deleting identity', message: `${res}` })
        })
        .finally(() => query.refetch())
    },
    async updateIdentity(identityId: string, input: UserUpdateIdentityInput) {
      sdk
        .userUpdateIdentity({ identityId, input })
        .then(() => {
          toastSuccess('Identity updated')
        })
        .catch((res) => {
          toastError({ title: 'Error updating identity', message: `${res}` })
        })
        .finally(() => query.refetch())
    },
    async refreshIdentity(identityId: string) {
      sdk
        .userRefreshIdentity({ identityId })
        .then(() => {
          toastSuccess('Identity refresh initiated')
        })
        .catch((res) => {
          toastError({ title: 'Error initiating identity refresh', message: `${res}` })
        })
        .finally(() => query.refetch())
    },
  }
}
