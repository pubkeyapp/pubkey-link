import { useSdk } from '@pubkey-link/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useMutation } from '@tanstack/react-query'

export function useUserValidateRole({ roleId }: { roleId: string }) {
  const sdk = useSdk()

  return useMutation({
    mutationKey: ['user', 'test-role', roleId],
    mutationFn: async (address: string) =>
      sdk
        .userValidateRole({ roleId, address })
        .then((res) => res.data?.result)
        .then(async (res) => {
          if (res) {
            console.log(res)
            toastSuccess('Role test passed')
            return res
          }
          toastError('Role test failed')
          return undefined
        })
        .catch((err) => {
          toastError(err.message)
          return undefined
        }),
  })
}
