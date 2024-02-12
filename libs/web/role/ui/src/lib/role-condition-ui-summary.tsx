import { Anchor, Group, Text } from '@mantine/core'
import { getNetworkTokenUrl, RoleCondition } from '@pubkey-link/sdk'
import { NetworkTokenUiTypeBadge } from '@pubkey-link/web-network-token-ui'

export function RoleConditionUiSummary({ condition }: { condition: RoleCondition }) {
  if (!condition.token) {
    return null
  }
  return (
    <Group gap="xs">
      <NetworkTokenUiTypeBadge type={condition.token.type} />
      <Text c="dimmed" fw="bold" span>
        {condition.amount}
      </Text>
      <Anchor href={getNetworkTokenUrl(condition.token)} target="_blank" fw="bold">
        {condition.token.symbol}
      </Anchor>
      <Text c="dimmed" span>
        {condition.token.name}
      </Text>
    </Group>
  )
}
