import { IdentityProvider } from '@pubkey-link/sdk'
import { useSdk } from '@pubkey-link/web-core-data-access'
import { useQuery } from '@tanstack/react-query'

export function useUserFindOneIdentity({ provider, providerId }: { provider: IdentityProvider; providerId: string }) {
  const sdk = useSdk()

  const query = useQuery({
    queryKey: ['user', 'find-one-identity', { provider, providerId }],
    queryFn: () => sdk.userFindOneIdentity({ provider, providerId }).then((res) => res?.data),
  })

  return {
    item: query.data?.item,
    query,
  }
}
