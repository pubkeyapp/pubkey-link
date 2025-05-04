import { CacheConfigKey } from '@pubkey-link/sdk'
import { useSdk } from '@pubkey-link/web-core-data-access'
import { useMutation } from '@tanstack/react-query'

export function useAdminCacheConfigSet() {
  const sdk = useSdk()

  return useMutation({
    mutationFn: (input: { key: CacheConfigKey; value: string }) =>
      sdk.adminCacheConfigSet({ key: input.key, value: input.value }).then((res) => res?.data?.adminCacheConfigSet),
  })
}
