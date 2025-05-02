import { PasswordInput, Switch, Table, Text, TextInput } from '@mantine/core'
import { CacheConfigKey, CacheConfigType, getEnumOptions } from '@pubkey-link/sdk'
import { useAdminCacheConfig, useAdminCacheConfigSet } from '@pubkey-link/web-cache-data-access'
import { UiBack, UiLoader, UiPage, UiStack } from '@pubkey-ui/core'

export function AdminCacheConfigFeature() {
  const { isLoading, data, refetch } = useAdminCacheConfig()
  const cacheConfigSetMutation = useAdminCacheConfigSet()
  const items = getEnumOptions(CacheConfigKey).map((item) => {
    const found = data?.find((i) => i.key === item.value)
    return {
      key: item.value,
      type: found?.type,
      value: found?.value,
    }
  })

  return (
    <UiPage title="Cache" leftAction={<UiBack />}>
      {isLoading ? (
        <UiLoader />
      ) : data ? (
        <UiStack>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th w={200}>Key</Table.Th>
                <Table.Th>Value</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {items.map((item) => (
                <Table.Tr key={item.key}>
                  <Table.Td>
                    {item.key}
                    <Text c="dimmed" size="xs">
                      ({item.type})
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <CacheConfigInput
                      key={item.key}
                      type={item.type ?? CacheConfigType.String}
                      onChange={async (value) => {
                        await cacheConfigSetMutation.mutateAsync({ key: item.key, value })
                        await refetch()
                      }}
                      value={item.value ?? ''}
                    />
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </UiStack>
      ) : (
        <div>No status</div>
      )}
    </UiPage>
  )
}

function CacheConfigInput({
  key,
  type,
  value,
  onChange,
}: {
  key: CacheConfigKey
  type: CacheConfigType
  value: string
  onChange: (value: string) => void
}) {
  switch (type) {
    case CacheConfigType.Boolean:
      return <Switch label={key} checked={value === 'true'} onChange={(e) => onChange(e.target.checked.toString())} />
    case CacheConfigType.String:
      return <TextInput label={key} value={value} onChange={(e) => onChange(e.target.value)} />
    case CacheConfigType.Secret:
      return <PasswordInput label={key} value={value} onChange={(e) => onChange(e.target.value)} />
    default:
      return null
  }
}
