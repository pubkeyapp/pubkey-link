import { Button, Group, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { Identity, UserUpdateIdentityInput } from '@pubkey-link/sdk'
import { UiStack } from '@pubkey-ui/core'

export function IdentityUiUpdateForm({
  item,
  onSubmit,
}: {
  item: Identity
  onSubmit: (res: UserUpdateIdentityInput) => void
}) {
  const form = useForm<UserUpdateIdentityInput>({
    initialValues: { name: item.name },
    validate: {
      name: (value) => {
        const trimmed = value?.trim() ?? ''
        if (trimmed.length > 50) {
          return 'Name is too long'
        }
      },
    },
  })
  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <UiStack>
        <TextInput label="Name" placeholder="Enter new name" {...form.getInputProps('name')} />
        <Group justify="flex-end">
          <Button type="submit" mt="md">
            Save
          </Button>
        </Group>
      </UiStack>
    </form>
  )
}
