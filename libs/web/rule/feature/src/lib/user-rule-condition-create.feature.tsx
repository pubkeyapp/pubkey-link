import { useUserCommunity } from '@pubkey-link/web-community-data-access'
import { useUserFindManyNetworkToken } from '@pubkey-link/web-network-token-data-access'
import { useMemo, useState } from 'react'

import { getEnumOptions, NetworkTokenType, RuleConditionType } from '@pubkey-link/sdk'
import { UiDebug, UiInfo, UiStack } from '@pubkey-ui/core'
import { Button, Group, Paper } from '@mantine/core'
import { NetworkTokenUiItem } from '@pubkey-link/web-network-token-ui'

export function UserRuleConditionCreateFeature() {
  const { cluster } = useUserCommunity()
  const { items } = useUserFindManyNetworkToken({ cluster })

  const [type, setType] = useState<RuleConditionType | null>(null)

  function mapAsset(type: RuleConditionType | null): NetworkTokenType {
    switch (type) {
      case RuleConditionType.AnybodiesAsset:
        return NetworkTokenType.Unknown
      case RuleConditionType.SolanaNonFungibleAsset:
        return NetworkTokenType.NonFungible
      case RuleConditionType.SolanaFungibleAsset:
        return NetworkTokenType.Fungible
      default:
        return NetworkTokenType.Unknown
    }
  }

  const tokens = useMemo(() => {
    return items.filter((item) => (item?.type ? item?.type === mapAsset(type) : false))
  }, [items, type])

  return (
    <UiStack>
      <UiInfo title="Create a condition" message="Conditions are used to validate the ownership of assets." />
      <UiStack>
        <Group>
          {getEnumOptions(RuleConditionType).map((item) => (
            <Button
              key={item.value}
              onClick={() => setType(item.value)}
              variant={item.value === type ? 'filled' : 'light'}
            >
              {item.label}
            </Button>
          ))}
        </Group>

        <Paper withBorder p="md" radius="sm" shadow="md">
          <UiStack>
            {tokens.map((token) => (
              <UiStack key={token.id}>
                <NetworkTokenUiItem networkToken={token} />
              </UiStack>
            ))}
          </UiStack>
        </Paper>
      </UiStack>
      <UiDebug data={{ type, tokens }} open />
    </UiStack>
  )
}
