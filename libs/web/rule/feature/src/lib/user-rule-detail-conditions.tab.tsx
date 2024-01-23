import { useUserFindOneRule } from '@pubkey-link/web-rule-data-access'
import { UiCard, UiDebug, UiError, UiGroup, UiInfo, UiLoader, UiStack, UiWarning } from '@pubkey-ui/core'
import { getEnumOptions, NetworkTokenType, RuleCondition, RuleConditionType } from '@pubkey-link/sdk'
import { Button, Group, Paper, Popover, TextInput } from '@mantine/core'
import { useMemo, useState } from 'react'
import { NetworkTokenUiItem } from '@pubkey-link/web-network-token-ui'
import { useUserCommunity } from '@pubkey-link/web-community-data-access'
import { useUserFindManyNetworkToken } from '@pubkey-link/web-network-token-data-access'
import { useDisclosure } from '@mantine/hooks'

export function UserRuleDetailConditionsTab({ ruleId }: { ruleId: string }) {
  const { item, query } = useUserFindOneRule({ ruleId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Rule not found." />
  }

  return item.conditions?.length ? (
    <UiStack>
      <RuleConditionsList conditions={item.conditions ?? []} />
    </UiStack>
  ) : (
    <CreateCondition />
  )
}

function CreateCondition() {
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

function RuleConditionsList({ conditions }: { conditions: RuleCondition[] }) {
  return (
    <UiStack>
      {conditions.map((condition) => (
        <UiCard
          key={condition.id}
          title={
            <UiGroup>
              <RuleConditionTypePopover type={condition.type} />
            </UiGroup>
          }
        >
          <RuleConditionPanel condition={condition} />
        </UiCard>
      ))}
    </UiStack>
  )
}
function RuleConditionTypePopover({ type }: { type: RuleConditionType }) {
  const [opened, { close, open }] = useDisclosure(false)
  return (
    <Popover width={200} position="bottom" withArrow shadow="md" opened={opened}>
      <Popover.Target>
        <Button variant="subtle" size="sm" onMouseEnter={open} onMouseLeave={close}>
          <RuleConditionTypeTitle type={type} />
        </Button>
      </Popover.Target>
      <Popover.Dropdown style={{ pointerEvents: 'none' }} w={300} p={0}>
        <RuleConditionInfo type={type} />
      </Popover.Dropdown>
    </Popover>
  )
}
function RuleConditionPanel({ condition }: { condition: RuleCondition }) {
  return (
    <UiStack>
      <RuleConditionSettings condition={condition} />
    </UiStack>
  )
}

function RuleConditionSettings({ condition }: { condition: RuleCondition }) {
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

function RuleConditionInfo({ type }: { type: RuleConditionType }) {
  switch (type) {
    case RuleConditionType.AnybodiesAsset:
      return (
        <UiInfo
          bg="inherit"
          title={<RuleConditionTypeTitle type={type} />}
          message={<UiStack>This condition validates asset ownership with Anybodies.</UiStack>}
        />
      )
    case RuleConditionType.SolanaNonFungibleAsset:
      return (
        <UiInfo
          bg="inherit"
          title={<RuleConditionTypeTitle type={type} />}
          message={<UiStack>This condition validates non-fungible asset ownership on Solana.</UiStack>}
        />
      )
    case RuleConditionType.SolanaFungibleAsset:
      return (
        <UiInfo
          bg="inherit"
          title={<RuleConditionTypeTitle type={type} />}
          message={<UiStack>This condition validates fungible asset ownership on Solana.</UiStack>}
        />
      )
    default:
      return <UiWarning message={`Unknown condition type: ${type}`} />
  }
}

function RuleConditionTypeTitle({ type }: { type: RuleConditionType }) {
  switch (type) {
    case RuleConditionType.AnybodiesAsset:
      return 'Anybodies Asset'
    case RuleConditionType.SolanaNonFungibleAsset:
      return 'Solana Non-Fungible Asset'
    case RuleConditionType.SolanaFungibleAsset:
      return 'Solana Fungible Asset'
    default:
      return `Unknown condition type: ${type}`
  }
}
