import { Rule, RuleCondition } from '@pubkey-link/sdk'
import { useValidateRule } from '@pubkey-link/web-rule-data-access'
import { useCallback, useEffect, useState } from 'react'
import { UiCard, UiDebug, UiInfo, UiStack, UiWarning } from '@pubkey-ui/core'
import { UiAddressInput } from '@pubkey-link/web-ui-core'
import { Button, Group } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'

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

export function UserRuleDetailValidateTab({ rule }: { rule: Rule }) {
  const { addAddress, addresses } = useRecentAddress()
  const validate = useValidateRule({ ruleId: rule.id })
  const [address, setAddress] = useState('')
  const [result, setResult] = useState<RuleCondition[] | undefined>()

  const search = useCallback(
    (addr: string) => {
      setResult(undefined)
      addAddress(addr)
      validate.mutateAsync(addr).then((result) => setResult(result))
    },
    [address],
  )

  useEffect(() => {
    if (address && !addresses.includes(address)) {
      addAddress(address)
    }
  }, [address, addresses, addAddress])

  if (!rule.conditions?.length) {
    return <UiWarning message="Rule needs at least one condition." />
  }

  return (
    <UiCard title="Validate Rule">
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
            <Button loading={validate.isPending} onClick={() => search(address)}>
              Validate
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
