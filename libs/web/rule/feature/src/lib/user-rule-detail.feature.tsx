import { Button, Group } from '@mantine/core'
import {
  UiBack,
  UiCard,
  UiDebug,
  UiDebugModal,
  UiError,
  UiInfo,
  UiLoader,
  UiPage,
  UiStack,
  UiTabRoutes,
} from '@pubkey-ui/core'
import { useTestRule, useUserFindOneRule } from '@pubkey-link/web-rule-data-access'
import { useParams } from 'react-router-dom'
import { UserRuleDetailConditionsTab } from './user-rule-detail-conditions.tab'
import { UserRuleDetailSettingsTab } from './user-rule-detail-settings.tab'
import { Rule } from '@pubkey-link/sdk'
import { UiAddressInput } from '@pubkey-link/web-ui-core'
import { useCallback, useEffect, useState } from 'react'
import { useLocalStorage } from '@mantine/hooks'

export function UserRuleDetailFeature() {
  const { ruleId } = useParams<{ ruleId: string }>() as { ruleId: string }
  const { item, query } = useUserFindOneRule({ ruleId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Rule not found." />
  }

  return (
    <UiPage
      title={<Group>{item.name}</Group>}
      leftAction={<UiBack />}
      rightAction={
        <Group>
          <UiDebugModal data={item} />
        </Group>
      }
    >
      <UiTabRoutes
        tabs={[
          {
            path: 'conditions',
            label: 'Conditions',
            element: (
              <UiStack>
                <UserRuleDetailConditionsTab ruleId={ruleId} />
                <TestRule rule={item} />
              </UiStack>
            ),
          },
          {
            path: 'settings',
            label: 'Settings',
            element: <UserRuleDetailSettingsTab ruleId={ruleId} />,
          },
        ]}
      />
    </UiPage>
  )
}

export function useRecentAddress() {
  const [addresses, setAddresses] = useLocalStorage<string[]>({
    key: 'pubkey-link-recent-addresses',
    defaultValue: [],
  })

  return {
    addresses,
    addAddress: (address: string) => {
      setAddresses((prev) => {
        const next = prev.filter((a) => a !== address)
        next.unshift(address)
        return next.slice(0, 5)
      })
    },
  }
}

function TestRule({ rule }: { rule: Rule }) {
  const { addAddress, addresses } = useRecentAddress()
  const testRule = useTestRule({ ruleId: rule.id })
  const [address, setAddress] = useState('')
  const [result, setResult] = useState('')

  const search = useCallback(
    (addr: string) => {
      setResult('')
      addAddress(addr)
      testRule.mutateAsync(addr).then((result) => setResult(result))
    },
    [address],
  )

  useEffect(() => {
    if (address && !addresses.includes(address)) {
      addAddress(address)
    }
  }, [address, addresses, addAddress])

  return (
    <UiCard title="Test Rule">
      <UiStack>
        <UiAddressInput address={address} setAddress={setAddress} />
        {addresses.length > 0 && (
          <UiStack>
            {addresses.map((addr) => (
              <Group key={addr}>
                <Button
                  display="flex"
                  onClick={() => {
                    setAddress(addr)
                    search(addr)
                  }}
                >
                  {addr}
                </Button>
              </Group>
            ))}
          </UiStack>
        )}

        {address ? (
          <UiStack>
            <Button loading={testRule.isPending} onClick={() => search(address)}>
              Test
            </Button>
          </UiStack>
        ) : (
          <UiInfo message="Enter an address to test the rule." />
        )}
        <UiDebug data={result} open />
      </UiStack>
    </UiCard>
  )
}
