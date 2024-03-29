import { IdentityProvider } from '@pubkey-link/sdk'
import { useSdk } from '@pubkey-link/web-core-data-access'
import { toastError } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'

export function useAdminFindUserByIdentity({
  provider,
  providerId,
}: {
  provider: IdentityProvider
  providerId: string
}) {
  const sdk = useSdk()

  return useQuery({
    queryKey: ['admin', 'find-user-by-identity', { provider, providerId }],
    queryFn: () =>
      sdk
        .adminFindUserByIdentity({ provider, providerId })
        .then((res) => res.data)
        .catch((err) => {
          toastError(err.message)
          return undefined
        }),
  })
}
