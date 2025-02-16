import { Button } from '@mantine/core'
import { IdentityProvider } from '@pubkey-link/sdk'
import {
  useAdminCheckAllocation,
  useAdminFindOneAllocation,
  useAdminGetAllocationSnapshots,
} from '@pubkey-link/web-allocation-data-access'
import { AllocationUiSnapshots } from '@pubkey-link/web-allocation-ui'
import { useAuth } from '@pubkey-link/web-auth-data-access'
import { useUserFindManyIdentity } from '@pubkey-link/web-identity-data-access'
import { UiCard, UiError, UiLoader } from '@pubkey-ui/core'
import { useMemo } from 'react'

export function AdminAllocationDetailAllocationsTab({ allocationId }: { allocationId: string }) {
  const { item, query } = useAdminFindOneAllocation({ allocationId })
  const { user } = useAuth()
  const { items: identities, query: queryIdentities } = useUserFindManyIdentity({
    provider: IdentityProvider.Solana,
    username: user?.username as string,
  })

  const mutationAllocation = useAdminCheckAllocation({ allocationId })
  const queryAllocationSnapshots = useAdminGetAllocationSnapshots({ allocationId })

  const wallets = identities.map((identity) => identity.providerId)

  const snapshots = queryAllocationSnapshots.data ?? []
  const walletData = mutationAllocation.data ?? []

  const result = useMemo(() => {
    return snapshots.map((snapshot) => {
      const snapshotId = snapshot.id

      const allocation = walletData
        //
        .filter((wallet) => {
          if (!wallet.snapshots) {
            return false
          }

          if (!wallet.snapshots[snapshotId]) {
            return false
          }
          return wallet
        })
        .map((wallet) => {
          if (!wallet.snapshots) {
            return 0
          }
          if (!wallet.snapshots[snapshotId]) {
            return 0
          }
          return {
            address: wallet.address,
            allocation: wallet.snapshots[snapshotId].allocation,
          }
        }) as { address: string; allocation: number }[]

      return {
        ...snapshot,
        allocation,
      }
    })
  }, [walletData, snapshots])
  if (query.isLoading || queryIdentities.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Allocation not found." />
  }

  if (!wallets.length) {
    return <UiError message="No wallets found." />
  }
  if (!snapshots.length) {
    return <UiError message="No snapshots found." />
  }

  return (
    <UiCard>
      <Button
        loading={mutationAllocation.isPending}
        onClick={() =>
          mutationAllocation.mutateAsync([
            'dean.ser',
            'whale.ser',
            'whales.ser',
            'BEEMANPx2jdmfR7jpn1hRdMuM2Vj4E3azBLb6RUBrCDY',
          ])
        }
      >
        Check
      </Button>
      <AllocationUiSnapshots hasWalletData={false} snapshots={result} />
    </UiCard>
  )
}
