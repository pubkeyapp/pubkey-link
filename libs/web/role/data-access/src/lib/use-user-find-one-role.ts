import {
  UserCreateRoleConditionInput,
  UserCreateRolePermissionInput,
  UserUpdateRoleConditionInput,
  UserUpdateRoleInput,
} from '@pubkey-link/sdk'
import { useSdk } from '@pubkey-link/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'

export function useUserFindOneRole({ roleId }: { roleId: string }) {
  const sdk = useSdk()
  const query = useQuery({
    queryKey: ['user', 'find-one-role', roleId],
    queryFn: () => sdk.userFindOneRole({ roleId }).then((res) => res.data),
    retry: 0,
  })
  const item = query.data?.item ?? undefined

  return {
    item,
    query,
    createRoleCondition: async (input: UserCreateRoleConditionInput) =>
      sdk
        .userCreateRoleCondition({ input })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            toastSuccess('Role condition created')
            await query.refetch()
            return true
          }
          toastError('Role condition not created')
          return false
        })
        .catch((err) => {
          toastError(err.message)
          return false
        }),
    createRolePermission: async (input: UserCreateRolePermissionInput) =>
      sdk
        .userCreateRolePermission({ input })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            toastSuccess('Role permission created')
            await query.refetch()
            return true
          }
          toastError('Role permission not created')
          return false
        })
        .catch((err) => {
          toastError(err.message)
          return false
        }),
    deleteRoleCondition: async (roleConditionId: string) =>
      sdk
        .userDeleteRoleCondition({ roleConditionId })
        .then(async (res) => {
          if (res) {
            toastSuccess('Role condition deleted')
            await query.refetch()
            return true
          }
          return false
        })
        .catch((err) => {
          toastError(err.message)
          return false
        }),
    deleteRolePermission: async (rolePermissionId: string) =>
      sdk
        .userDeleteRolePermission({ rolePermissionId })
        .then(async (res) => {
          if (res) {
            toastSuccess('Role permission deleted')
            await query.refetch()
            return true
          }
          return false
        })
        .catch((err) => {
          toastError(err.message)
          return false
        }),
    updateRole: async (input: UserUpdateRoleInput) =>
      sdk
        .userUpdateRole({ roleId, input })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            toastSuccess('Role updated')
            await query.refetch()
            return true
          }
          toastError('Role not updated')
          return false
        })
        .catch((err) => {
          toastError(err.message)
          return false
        }),
    updateRoleCondition: async (roleConditionId: string, input: UserUpdateRoleConditionInput) =>
      sdk
        .userUpdateRoleCondition({ roleConditionId, input })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            toastSuccess('Role Condition updated')
            await query.refetch()
            return true
          }
          toastError('Role Condition not updated')
          return false
        })
        .catch((err) => {
          toastError(err.message)
          return false
        }),
  }
}
