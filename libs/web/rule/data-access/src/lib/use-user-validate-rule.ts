import { useSdk } from '@pubkey-link/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useMutation } from '@tanstack/react-query'

export function useUserValidateRule({ ruleId }: { ruleId: string }) {
  const sdk = useSdk()

  return useMutation({
    mutationKey: ['user', 'test-rule', ruleId],
    mutationFn: async (address: string) =>
      sdk
        .userValidateRule({ ruleId, address })
        .then((res) => res.data?.result)
        .then(async (res) => {
          if (res) {
            console.log(res)
            toastSuccess('Rule test passed')
            return res
          }
          toastError('Rule test failed')
          return undefined
        })
        .catch((err) => {
          toastError(err.message)
          return undefined
        }),
  })
}
