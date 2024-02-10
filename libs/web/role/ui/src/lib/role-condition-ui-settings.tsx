import { Paper } from '@mantine/core'
import { NetworkTokenType, RoleCondition } from '@pubkey-link/sdk'
import { NetworkTokenUiItem } from '@pubkey-link/web-network-token-ui'
import { UiDebug, UiStack } from '@pubkey-ui/core'

export function RoleConditionUiSettings({ condition }: { condition: RoleCondition }) {
  switch (condition.type) {
    case NetworkTokenType.NonFungible:
      return condition.token ? (
        <Paper withBorder p="md" radius="sm" shadow="md">
          <NetworkTokenUiItem networkToken={condition.token} />
        </Paper>
      ) : (
        <UiDebug data={condition} />
      )
    case NetworkTokenType.Fungible:
      return condition.token ? (
        <Paper withBorder p="md" radius="sm" shadow="md">
          <NetworkTokenUiItem networkToken={condition.token} />
        </Paper>
      ) : (
        <UiDebug data={condition} />
      )
    default:
      return (
        <UiStack>
          <UiDebug data={condition} open />
        </UiStack>
      )
  }
}
