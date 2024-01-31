import { Button, Stepper, Text } from '@mantine/core'
import {
  Community,
  getEnumOptions,
  NetworkToken,
  NetworkTokenType,
  Rule,
  RuleConditionType,
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
  const [ruleConditionType, setRuleConditionType] = useState<RuleConditionType | undefined>(undefined)
  const [networkToken, setNetworkToken] = useState<NetworkToken | undefined>(undefined)
  const [amount, setAmount] = useState<string>('1')
  const tokens: NetworkToken[] = useMemo(() => {
    if (ruleConditionType === RuleConditionType.SolanaFungibleAsset) {
      return props.tokens.filter((token) => token.type === NetworkTokenType.Fungible)
    }
    if (ruleConditionType === RuleConditionType.SolanaNonFungibleAsset) {
      return props.tokens.filter((token) => token.type === NetworkTokenType.NonFungible)
    }
    return []
  }, [ruleConditionType, props.tokens])

  const config: UserCreateRuleConditionInput = useMemo(() => {
    const base: UserCreateRuleConditionInput = {
      ruleId: props.rule.id,
      type: ruleConditionType ?? RuleConditionType.SolanaFungibleAsset,
    }
    if (ruleConditionType === RuleConditionType.SolanaFungibleAsset && networkToken) {
      return {
        ...base,
        tokenId: networkToken?.id,
        account: networkToken?.account,
        amount: '1',
        config: {},
        filters: {},
      }
    }
    if (ruleConditionType === RuleConditionType.SolanaNonFungibleAsset && networkToken) {
      return {
        ...base,
        tokenId: networkToken?.id,
        account: networkToken?.account,
        amount: '1',
        config: {},
        filters: {},
      }
    }
    if (ruleConditionType === RuleConditionType.AnybodiesAsset) {
      return {
        ...base,
        config: { vaultId: '' },
      }
    }
    return {
      ...base,
    }
  }, [props.rule.id, ruleConditionType, networkToken])

  async function addCondition(type: RuleConditionType, token: NetworkToken) {
    console.log('addCondition', type, token)
    createRuleCondition({ ...config, type, tokenId: token.id, account: token.account })
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
    if (!ruleConditionType) return 0
    if (!networkToken) return 1
    return 2
  }, [ruleConditionType, networkToken])

  return (
    <UiStack>
      <UiCard title="Create Condition">
        <UiStack>
          <Stepper
            active={isActive}
            onStepClick={(step) => {
              if (step === 0) {
                setRuleConditionType(undefined)
                setNetworkToken(undefined)
              }
              if (step === 1) {
                setNetworkToken(undefined)
              }
            }}
          >
            <Stepper.Step label="Condition Type" description="Select Condition Type">
              <RuleConditionUiSelectType
                ruleConditionType={ruleConditionType}
                setRuleConditionType={(type) => {
                  setRuleConditionType(type ?? undefined)
                  setNetworkToken(undefined)
                }}
              />
            </Stepper.Step>
            <Stepper.Step label="Configuration" description="Configure the condition">
              {ruleConditionType ? (
                <UiStack>
                  <RuleConditionUiTypeForm
                    amount={amount}
                    setAmount={setAmount}
                    networkToken={networkToken}
                    setNetworkToken={setNetworkToken}
                    type={ruleConditionType}
                    tokens={tokens.sort((a, b) => a.name.localeCompare(b.name))}
                  />
                </UiStack>
              ) : (
                <UiInfo message="Select a condition type" />
              )}
            </Stepper.Step>
            <Stepper.Step label="Confirm" description="Confirm and create condition">
              {ruleConditionType && networkToken ? (
                <UiStack>
                  <UiKeyValueTable
                    items={[
                      ['Rule', <RuleUiItem rule={props.rule} />],
                      ['Type', <RuleConditionUiItem type={ruleConditionType} />],
                      networkToken ? ['Token', <NetworkTokenUiItem networkToken={networkToken} />] : undefined,
                      [
                        'Amount (min)',
                        <Text size="xl" fw="bold">
                          {amount} {networkToken?.symbol}
                        </Text>,
                      ],
                    ]}
                  />

                  <Button size="xl" onClick={() => addCondition(ruleConditionType, networkToken)}>
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
  ruleConditionType,
  setRuleConditionType,
}: {
  ruleConditionType: RuleConditionType | undefined
  setRuleConditionType: (type: RuleConditionType | undefined) => void
}) {
  return ruleConditionType ? (
    <RuleConditionUiNavLink
      type={ruleConditionType}
      active
      onClick={() => {
        setRuleConditionType(undefined)
      }}
    />
  ) : (
    <UiStack>
      {getEnumOptions(RuleConditionType).map(({ value: type }) => (
        <RuleConditionUiNavLink
          type={type}
          key={type}
          onClick={() => setRuleConditionType(type)}
          active={ruleConditionType === type}
        />
      ))}
    </UiStack>
  )
}
