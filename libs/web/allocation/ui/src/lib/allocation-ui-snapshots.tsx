import { Alert, Box, Stack, Text, Title, Tooltip } from '@mantine/core'
import { AllocationSnapshot } from '@pubkey-link/web-allocation-data-access'
import { IconCircleCheck, IconCircleDashed } from '@tabler/icons-react'

export function AllocationUiSnapshots({
  snapshots,
  hasWalletData,
}: {
  snapshots: AllocationSnapshot[]
  hasWalletData: boolean
}) {
  return (
    <Stack>
      <Title order={2} ta="center">
        Eligibility Criteria
      </Title>
      {snapshots
        .sort((a, b) => a.id.localeCompare(b.id))
        .map((snapshot) => (
          <HomeUiSnapshotItem key={snapshot.id} snapshot={snapshot} hasWalletData={hasWalletData} />
        ))}
    </Stack>
  )
}

export function HomeUiSnapshotItem({
  snapshot,
  hasWalletData,
}: {
  snapshot: AllocationSnapshot
  hasWalletData: boolean
}) {
  const hasAllocation = (snapshot?.allocation ?? [])?.some((allocation) => allocation.allocation > 0)
  const withAllocation = (snapshot?.allocation ?? []).filter((allocation) => allocation.allocation > 0) ?? []
  return (
    <Alert
      radius="xl"
      color={allocationColor(hasAllocation)}
      key={snapshot.id}
      title={
        <Tooltip label={snapshot.description}>
          <Text fw="bold">{snapshot.name}</Text>
        </Tooltip>
      }
      icon={allocationIcon(hasAllocation)}
    >
      {withAllocation?.length ? (
        withAllocation?.map((allocation) => (
          <Box key={allocation.address}>
            <Text c={allocationColor(allocation.allocation > 0)}>{allocation.address}</Text>
          </Box>
        ))
      ) : (
        <Text c="dimmed">No allocations found</Text>
      )}
    </Alert>
  )
}

function allocationColor(hasAllocation: boolean) {
  return hasAllocation ? 'green' : 'red'
}

function allocationIcon(hasAllocation: boolean) {
  return hasAllocation ? <IconCircleCheck /> : <IconCircleDashed />
}
