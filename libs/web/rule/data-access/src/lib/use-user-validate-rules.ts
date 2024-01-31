import { useSdk } from '@pubkey-link/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useMutation } from '@tanstack/react-query'

export function useUserValidateRules({ communityId }: { communityId: string }) {
  const sdk = useSdk()

  return useMutation({
    mutationKey: ['user', 'validateRules', communityId],
    mutationFn: async () =>
      sdk
        .userValidateRules({ communityId })
        .then((res) => res.data?.result)
        .then(async (res) => {
          if (res) {
            console.log(res)
            toastSuccess('Rules validated')
            return res
          }
          toastError('Rules validation failed')
          return undefined
        })
        .catch((err) => {
          toastError(err.message)
          return undefined
        }),
  })
}
