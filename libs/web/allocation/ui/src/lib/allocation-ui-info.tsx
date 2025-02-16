import { Allocation } from '@pubkey-link/sdk'
import { UiInfoItems, UiInfoTable, UiTime } from '@pubkey-ui/core'

export function AllocationUiInfo({ allocation }: { allocation?: Allocation }) {
  if (!allocation) return null

  const items: UiInfoItems = [
    ['name', allocation.name],
    ['Created At', <UiTime size="xs" c="dimmed" date={new Date(allocation.createdAt ?? '0')} />],
    ['Updated At', <UiTime size="xs" c="dimmed" date={new Date(allocation.updatedAt ?? '0')} />],
  ]

  return <UiInfoTable items={items} />
}
