import { Paper } from '@mantine/core'
import { Resolver } from '@pubkey-link/sdk'
import { UiDebugModal, UiGroup } from '@pubkey-ui/core'
import { ResolverUiItem } from './resolver-ui-item'

export function ResolverUiGridItem({ resolver, to }: { resolver: Resolver; to?: string }) {
  return (
    <Paper withBorder p="md">
      <UiGroup>
        <ResolverUiItem resolver={resolver} to={to} />
        <UiDebugModal data={resolver} />
      </UiGroup>
    </Paper>
  )
}
