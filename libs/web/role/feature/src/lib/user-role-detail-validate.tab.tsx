import { Button, Group } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { Role, RoleCondition } from '@pubkey-link/sdk'
import { useUserValidateRole } from '@pubkey-link/web-role-data-access'
import { UiAddressInput } from '@pubkey-link/web-ui-core'
import { UiCard, UiDebug, UiInfo, UiStack, UiWarning } from '@pubkey-ui/core'
import { useCallback, useEffect, useState } from 'react'

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

export function UserRoleDetailValidateTab({ role }: { role: Role }) {
  const { addAddress, addresses } = useRecentAddress()
  const validate = useUserValidateRole({ roleId: role.id })
  const [address, setAddress] = useState('')
  const [result, setResult] = useState<RoleCondition[] | undefined>()

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

  if (!role.conditions?.length) {
    return <UiWarning message="Role needs at least one condition." />
  }

  return (
    <UiCard title="Validate Role">
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
          <UiInfo message="Enter an address to test the role." />
        )}
        <UiDebug data={result} open />
      </UiStack>
    </UiCard>
  )
}
