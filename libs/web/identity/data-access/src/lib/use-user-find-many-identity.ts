import { Identity, IdentityProvider } from '@pubkey-link/sdk'
import { useSdk } from '@pubkey-link/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export function useUserFindManyIdentity() {
  const sdk = useSdk()
  const query = useQuery({
    queryKey: ['user', 'find-many-identity'],
    queryFn: () => sdk.userFindManyIdentity().then((res) => res?.data),
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
        { provider: IdentityProvider.Discord, items: [] },
        { provider: IdentityProvider.GitHub, items: [] },
        { provider: IdentityProvider.Solana, items: [] },
        { provider: IdentityProvider.Twitter, items: [] },
      ] as { provider: IdentityProvider; items: Identity[] }[],
    )
  }, [query.data])

  const items = query.data?.items ?? []

  const discordIdentity = items.find((x) => x.provider === IdentityProvider.Discord)

  return {
    expiredDiscord: discordIdentity?.expired ?? false,
    grouped,
    hasDiscord: !!discordIdentity,
    hasGithub: items.some((x) => x.provider === IdentityProvider.GitHub),
    hasSolana: items.some((x) => x.provider === IdentityProvider.Solana),
    items,
    query,
    deleteIdentity(identityId: string) {
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
  }
}
