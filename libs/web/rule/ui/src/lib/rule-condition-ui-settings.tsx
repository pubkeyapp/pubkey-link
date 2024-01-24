import { RuleCondition, RuleConditionType } from '@pubkey-link/sdk'
import { Paper, TextInput } from '@mantine/core'
import { NetworkTokenUiItem } from '@pubkey-link/web-network-token-ui'
import { UiDebug, UiStack } from '@pubkey-ui/core'

export function RuleConditionUiSettings({ condition }: { condition: RuleCondition }) {
  switch (condition.type) {
    case RuleConditionType.AnybodiesAsset:
      return (
        <Paper withBorder p="md" radius="sm" shadow="md">
          <TextInput
            label="Anybodies Vault ID"
            placeholder="Anybodies Vault ID"
            defaultValue={condition.config.vaultId ?? ''}
            readOnly
          />
        </Paper>
      )
    case RuleConditionType.SolanaNonFungibleAsset:
      return condition.token ? (
        <Paper withBorder p="md" radius="sm" shadow="md">
          <NetworkTokenUiItem networkToken={condition.token} />
        </Paper>
      ) : (
        <UiDebug data={condition} />
      )
    case RuleConditionType.SolanaFungibleAsset:
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
