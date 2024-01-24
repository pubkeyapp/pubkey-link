import { IdentityProvider } from '@pubkey-link/sdk'
import { useSdk } from '@pubkey-link/web-core-data-access'
import { toastError } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'

export function useAnonFindUserByIdentity({
  provider,
  providerId,
}: {
  provider: IdentityProvider
  providerId: string
}) {
  const sdk = useSdk()

  return useQuery({
    queryKey: ['anon', 'find-user-by-identity', { provider, providerId }],
    queryFn: () =>
      sdk
        .anonFindUserByIdentity({ provider, providerId })
        .then((res) => res.data)
        .catch((err) => {
          toastError(err.message)
          return undefined
        }),
  })
}
