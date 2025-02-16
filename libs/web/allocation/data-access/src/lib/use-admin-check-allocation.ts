import { useSdk } from '@pubkey-link/web-core-data-access'
import { toastError } from '@pubkey-ui/core'
import { useMutation, useQuery } from '@tanstack/react-query'

export interface AllocationCheckResult {
  address: string
  allocation: number
  snapshots: Record<string, { amount: number; allocation: number }>
}

export function useAdminCheckAllocation({ allocationId }: { allocationId: string }) {
  const sdk = useSdk()
  return useMutation({
    mutationFn: async (address: string[]) =>
      sdk
        .adminCheckAllocation({ allocationId, address })
        .then((res) => res.data.check as AllocationCheckResult[])
        .catch((err) => {
          toastError(err.message)
          throw err
        }),
  })
}

export interface AllocationSnapshot {
  type: string
  minimumAmount: number
  id: string
  name: string
  description: string
  address: string
  allocation?: { address: string; allocation: number }[]
}

export function useAdminGetAllocationSnapshots({ allocationId }: { allocationId: string }) {
  const sdk = useSdk()
  return useQuery({
    queryKey: ['admin', 'get-allocation-snapshots', allocationId],
    queryFn: async () =>
      sdk
        .adminGetAllocationSnapshots({ allocationId })
        .then((res) => res.data.snapshots as AllocationSnapshot[])
        .catch((err) => {
          toastError(err.message)
          throw err
        }),
  })
}
