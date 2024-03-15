import { useSdk } from '@pubkey-link/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useMutation } from '@tanstack/react-query'

export function useUserSyncCommunityRoles({ communityId }: { communityId: string }) {
  const sdk = useSdk()

  return useMutation({
    mutationKey: ['user', 'validateRoles', communityId],
    mutationFn: async () =>
      sdk
        .userSyncCommunityRoles({ communityId })
        .then((res) => res.data?.result)
        .then(async (res) => {
          if (res) {
            toastSuccess('Roles validated')
            return res
          }
          toastError('Roles validation failed')
          return undefined
        })
        .catch((err) => {
          toastError(err.message)
          return undefined
        }),
  })
}
