import { AdminUpdateAllocationInput } from '@pubkey-link/sdk'
import { useSdk } from '@pubkey-link/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useMutation, useQuery } from '@tanstack/react-query'

export function useAdminFindOneAllocation({ allocationId }: { allocationId: string }) {
  const sdk = useSdk()
  const query = useQuery({
    queryKey: ['admin', 'find-one-allocation', allocationId],
    queryFn: () => sdk.adminFindOneAllocation({ allocationId }).then((res) => res.data),
    retry: 0,
  })
  const item = query.data?.item ?? undefined

  return {
    item,
    query,
    updateAllocation: async (input: AdminUpdateAllocationInput) =>
      sdk
        .adminUpdateAllocation({ allocationId, input })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            toastSuccess('Allocation updated')
            await query.refetch()
            return true
          }
          toastError('Allocation not updated')
          return false
        })
        .catch((err) => {
          toastError(err.message)
          return false
        }),
    checkAllocation: async (address: string[]) =>
      sdk
        .adminCheckAllocation({ allocationId, address })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            toastSuccess('Allocation checked')
            await query.refetch()
            return res.check
          }
          toastError('Allocation not checked')
          return false
        })
        .catch((err) => {
          toastError(err.message)
          return false
        }),
  }
}

export function useAdminCheckAllocation({allocationId}:{allocationId:string}) {
  const sdk = useSdk()
  return useMutation({
    mutationFn: async (address: string[]) => {
      return sdk.adminCheckAllocation({ allocationId, address }).then((res) => res.data)
  },
  })
}