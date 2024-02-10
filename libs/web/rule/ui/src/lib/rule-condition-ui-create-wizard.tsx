import { Button, Stepper, Text } from '@mantine/core'
import {
  Community,
  getEnumOptions,
  NetworkToken,
  NetworkTokenType,
  Rule,
  UserCreateRuleConditionInput,
} from '@pubkey-link/sdk'
import { NetworkTokenUiItem } from '@pubkey-link/web-network-token-ui'
import { useUserFindOneRule } from '@pubkey-link/web-rule-data-access'
import { UiKeyValueTable } from '@pubkey-link/web-ui-core'
import { toastError, toastSuccess, UiCard, UiDebug, UiInfo, UiStack } from '@pubkey-ui/core'
import { useMemo, useState } from 'react'
import { RuleConditionUiItem } from './rule-condition-ui-item'
import { RuleConditionUiNavLink } from './rule-condition-ui-nav-link'
import { RuleConditionUiTypeForm } from './rule-condition-ui-type-form'
import { RuleUiItem } from './rule-ui-item'

export function RuleConditionUiCreateWizard(props: { rule: Rule; community: Community; tokens: NetworkToken[] }) {
  const { query, createRuleCondition } = useUserFindOneRule({ ruleId: props.rule.id })
  const [networkTokenType, setNetworkTokenType] = useState<NetworkTokenType | undefined>(undefined)
  const [networkToken, setNetworkToken] = useState<NetworkToken | undefined>(undefined)
  const [amount, setAmount] = useState<string>('0')
  const tokens: NetworkToken[] = useMemo(() => {
    if (networkTokenType === NetworkTokenType.Fungible) {
      return props.tokens.filter((token) => token.type === NetworkTokenType.Fungible)
    }
    if (networkTokenType === NetworkTokenType.NonFungible) {
      return props.tokens.filter((token) => token.type === NetworkTokenType.NonFungible)
    }
    return []
  }, [networkTokenType, props.tokens])

  const config: UserCreateRuleConditionInput = useMemo(() => {
    const base: UserCreateRuleConditionInput = {
      ruleId: props.rule.id,
      type: networkTokenType ?? NetworkTokenType.Fungible,
      tokenId: networkToken?.id ?? '',
    }
    if (networkTokenType === NetworkTokenType.Fungible && networkToken) {
      return {
        ...base,
        tokenId: networkToken?.id,
        amount: amount ?? '0',
        config: {},
        filters: {},
      }
    }
    if (networkTokenType === NetworkTokenType.NonFungible && networkToken) {
      return {
        ...base,
        tokenId: networkToken?.id,
        amount: amount ?? '0',
        config: {},
        filters: {},
      }
    }
    return {
      ...base,
    }
  }, [props.rule.id, networkTokenType, networkToken])

  async function addCondition(type: NetworkTokenType, token: NetworkToken) {
    console.log('addCondition', type, token)
    createRuleCondition({ ...config, type, tokenId: token.id })
      .then(async (res) => {
        console.log('res', res)
        toastSuccess('Condition created')
        query.refetch()
      })
      .catch((err) => {
        toastError('Error creating condition')
        console.log('err', err)
      })
  }

  const isActive = useMemo(() => {
    if (!networkTokenType) return 0
    if (!networkToken) return 1
    return 2
  }, [networkTokenType, networkToken])

  return (
    <UiStack>
      <UiCard title="Create Condition">
        <UiStack>
          <Stepper
            active={isActive}
            onStepClick={(step) => {
              if (step === 0) {
                setNetworkTokenType(undefined)
                setNetworkToken(undefined)
              }
              if (step === 1) {
                setNetworkToken(undefined)
              }
            }}
          >
            <Stepper.Step label="Condition Type" description="Select Condition Type">
              <RuleConditionUiSelectType
                networkTokenType={networkTokenType}
                setNetworkTokenType={(type) => {
                  setNetworkTokenType(type ?? undefined)
                  setNetworkToken(undefined)
                }}
              />
            </Stepper.Step>
            <Stepper.Step label="Configuration" description="Configure the condition">
              {networkTokenType ? (
                <UiStack>
                  <RuleConditionUiTypeForm
                    amount={amount}
                    setAmount={setAmount}
                    networkToken={networkToken}
                    setNetworkToken={setNetworkToken}
                    type={networkTokenType}
                    tokens={tokens.sort((a, b) => a.name.localeCompare(b.name))}
                  />
                </UiStack>
              ) : (
                <UiInfo message="Select a condition type" />
              )}
            </Stepper.Step>
            <Stepper.Step label="Confirm" description="Confirm and create condition">
              {networkTokenType && networkToken ? (
                <UiStack>
                  <UiKeyValueTable
                    items={[
                      ['Rule', <RuleUiItem rule={props.rule} />],
                      ['Type', <RuleConditionUiItem type={networkTokenType} />],
                      networkToken ? ['Token', <NetworkTokenUiItem networkToken={networkToken} />] : undefined,
                      [
                        'Amount (min)',
                        <Text size="xl" fw="bold">
                          {amount} {networkToken?.symbol}
                        </Text>,
                      ],
                    ]}
                  />

                  <Button size="xl" onClick={() => addCondition(networkTokenType, networkToken)}>
                    Create Condition
                  </Button>
                </UiStack>
              ) : (
                <UiInfo message="Select a condition type and configure it" />
              )}
            </Stepper.Step>
            <Stepper.Completed>Completed, click back button to get to previous step</Stepper.Completed>
          </Stepper>
        </UiStack>
      </UiCard>
      <UiDebug data={config} />
    </UiStack>
  )
}

function RuleConditionUiSelectType({
  networkTokenType,
  setNetworkTokenType,
}: {
  networkTokenType: NetworkTokenType | undefined
  setNetworkTokenType: (type: NetworkTokenType | undefined) => void
}) {
  return networkTokenType ? (
    <RuleConditionUiNavLink
      type={networkTokenType}
      active
      onClick={() => {
        setNetworkTokenType(undefined)
      }}
    />
  ) : (
    <UiStack>
      {getEnumOptions(NetworkTokenType).map(({ value: type }) => (
        <RuleConditionUiNavLink
          type={type}
          key={type}
          onClick={() => setNetworkTokenType(type)}
          active={networkTokenType === type}
        />
      ))}
    </UiStack>
  )
}
