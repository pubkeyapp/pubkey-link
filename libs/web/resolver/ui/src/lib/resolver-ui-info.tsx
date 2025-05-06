import { Resolver } from '@pubkey-link/sdk'
import { UiInfoItems, UiInfoTable, UiTime } from '@pubkey-ui/core'

export function ResolverUiInfo({ resolver }: { resolver?: Resolver }) {
  if (!resolver) return null

  const items: UiInfoItems = [
    ['name', resolver.name],
    ['Created At', <UiTime size="xs" c="dimmed" date={new Date(resolver.createdAt ?? '0')} />],
    ['Updated At', <UiTime size="xs" c="dimmed" date={new Date(resolver.updatedAt ?? '0')} />],
  ]

  return <UiInfoTable items={items} />
}
