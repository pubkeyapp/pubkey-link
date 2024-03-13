import { Button, Group, Select, TextInput } from '@mantine/core'
import { ComboboxItem } from '@mantine/core/lib/components/Combobox/Combobox.types'
import { useForm } from '@mantine/form'
import { Identity, UserCreateTeamInput } from '@pubkey-link/sdk'
import { UiStack } from '@pubkey-ui/core'
import { useEffect } from 'react'

export function UserTeamUiCreateForm({
  identities,
  usedIdentityIds,
  submit,
}: {
  identities: Identity[]
  usedIdentityIds: string[]
  submit: (res: UserCreateTeamInput) => Promise<boolean>
}) {
  const available = identities.find((i) => !usedIdentityIds.includes(i.id))
  const options: ComboboxItem[] = identities.map((i) => ({
    value: i.id,
    label: i.name,
    disabled: usedIdentityIds.includes(i.id),
  }))

  const form = useForm<UserCreateTeamInput>({
    initialValues: {
      communityId: '',
      name: available ? available.name : '',
      identityId: available ? available.id : '',
    },
  })

  useEffect(() => {
    form.setFieldValue('name', available ? available.name : '')
    form.setFieldValue('identityId', available ? available.id : '')
  }, [available])

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        return submit(values as UserCreateTeamInput)
      })}
    >
      <UiStack>
        <TextInput required label="Name" description="Name of the team" {...form.getInputProps('name')} />
        <Select
          required
          label="Identity"
          description="Select the identity to share with the team"
          data={options}
          {...form.getInputProps('identityId')}
        />

        <Group justify="right">
          <Button type="submit">Create</Button>
        </Group>
      </UiStack>
    </form>
  )
}
