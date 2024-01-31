import { UserCreateRuleConditionInput, UserCreateRulePermissionInput, UserUpdateRuleInput } from '@pubkey-link/sdk'
import { useSdk } from '@pubkey-link/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useMutation, useQuery } from '@tanstack/react-query'

export function useUserFindOneRule({ ruleId }: { ruleId: string }) {
  const sdk = useSdk()
  const query = useQuery({
    queryKey: ['user', 'find-one-rule', ruleId],
    queryFn: () => sdk.userFindOneRule({ ruleId }).then((res) => res.data),
    retry: 0,
  })
  const item = query.data?.item ?? undefined

  return {
    item,
    query,
    createRuleCondition: async (input: UserCreateRuleConditionInput) =>
      sdk
        .userCreateRuleCondition({ input })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            toastSuccess('Rule condition created')
            await query.refetch()
            return true
          }
          toastError('Rule condition not created')
          return false
        })
        .catch((err) => {
          toastError(err.message)
          return false
        }),
    createRulePermission: async (input: UserCreateRulePermissionInput) =>
      sdk
        .userCreateRulePermission({ input })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            toastSuccess('Rule permission created')
            await query.refetch()
            return true
          }
          toastError('Rule permission not created')
          return false
        })
        .catch((err) => {
          toastError(err.message)
          return false
        }),
    deleteRuleCondition: async (ruleConditionId: string) =>
      sdk
        .userDeleteRuleCondition({ ruleConditionId })
        .then(async (res) => {
          if (res) {
            toastSuccess('Rule condition deleted')
            await query.refetch()
            return true
          }
          return false
        })
        .catch((err) => {
          toastError(err.message)
          return false
        }),
    deleteRulePermission: async (rulePermissionId: string) =>
      sdk
        .userDeleteRulePermission({ rulePermissionId })
        .then(async (res) => {
          if (res) {
            toastSuccess('Rule permission deleted')
            await query.refetch()
            return true
          }
          return false
        })
        .catch((err) => {
          toastError(err.message)
          return false
        }),
    updateRule: async (input: UserUpdateRuleInput) =>
      sdk
        .userUpdateRule({ ruleId, input })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            toastSuccess('Rule updated')
            await query.refetch()
            return true
          }
          toastError('Rule not updated')
          return false
        })
        .catch((err) => {
          toastError(err.message)
          return false
        }),
  }
}

export function useValidateRule({ ruleId }: { ruleId: string }) {
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
