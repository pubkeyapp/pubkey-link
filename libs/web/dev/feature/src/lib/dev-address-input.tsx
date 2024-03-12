import {
  ActionIcon,
  Autocomplete,
  AutocompleteProps,
  Button,
  Combobox,
  Group,
  Input,
  InputBase,
  Text,
  useCombobox,
} from '@mantine/core'
import { toastSuccess, UiCard, UiDebug, UiStack } from '@pubkey-ui/core'
import { useForm } from '@mantine/form'
import { useEffect, useState } from 'react'
import { IconCurrencySolana, IconX } from '@tabler/icons-react'
import { validateSolanaPublicKey } from '@pubkey-link/web-core-ui'
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
        return next.slice(0, 10)
      })
    },
  }
}

export function DevAddressInput() {
  const { addresses } = useRecentAddress()
  const [address, setAddress] = useState<string | undefined>(undefined)
  return (
    <UiCard title="Address Input">
      <UiStack>
        <Group justify="center">
          <Button onClick={() => toastSuccess('gm!')}>Click me!</Button>
        </Group>
        <UiRecentAddressInput address={address || ''} setAddress={setAddress} />
        <UiDebug
          data={{
            //
            addresses,
            address,
          }}
          open
        />
      </UiStack>
    </UiCard>
  )
}

export function UiRecentAddressInput({
  address,
  setAddress,
  ...props
}: AutocompleteProps & {
  address: string
  setAddress: (address: string) => void
}) {
  const { addresses, addAddress } = useRecentAddress()
  const form = useForm({
    initialValues: { address },
    validate: {
      address: validateSolanaPublicKey,
    },
  })

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  })

  const options = addresses.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ))

  useEffect(() => {
    console.log('address', address)
    if (!form.values.address || form.values.address === address) {
      return
    }
    form.setValues({ address })
  }, [address])

  return (
    <form
      onSubmit={form.onSubmit(({ address }) => {
        console.log('onSubmit', address)
        setTimeout(() => {
          setAddress(address)
          if (!addresses.includes(address)) {
            addAddress(address)
          }
        }, 1)
      })}
    >
      <Combobox
        store={combobox}
        onOptionSubmit={(val) => {
          setAddress(val)
          combobox.closeDropdown()
        }}
      >
        <Combobox.Target>
          <InputBase
            component="button"
            type="button"
            pointer
            rightSection={<Combobox.Chevron />}
            rightSectionPointerEvents="none"
            onClick={() => combobox.toggleDropdown()}
          >
            {address || <Input.Placeholder>Pick value</Input.Placeholder>}
          </InputBase>
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Search
            value={address}
            onChange={(event) => setAddress(event.currentTarget.value)}
            placeholder="Enter Solana address (base58)"
          />
          <Combobox.Options>{options}</Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>

      <Autocomplete
        label="Address"
        placeholder="Enter Solana address (base58)"
        data={addresses}
        leftSection={
          <Text c="dimmed" display="flex">
            <IconCurrencySolana />
          </Text>
        }
        rightSection={
          <ActionIcon
            variant="light"
            size="sm"
            radius="sm"
            ml={4}
            disabled={!form.values.address}
            onClick={() => form.setValues({ address: '' })}
          >
            <IconX />
          </ActionIcon>
        }
        {...props}
        {...form.getInputProps('address')}
      />
    </form>
  )
}
