import { Button, Group, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { RoleCondition, UserUpdateRoleConditionInput } from '@pubkey-link/sdk'
import { UiStack } from '@pubkey-ui/core'
import { ReactNode } from 'react'

export function RoleConditionUiUpdateFormFungible({
  children,
  submit,
  item,
}: {
  children?: ReactNode
  submit: (res: UserUpdateRoleConditionInput) => Promise<boolean>
  item: RoleCondition
}) {
  const form = useForm<UserUpdateRoleConditionInput>({
    initialValues: {
      amount: item.amount ?? '',
    },
  })

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        return submit(values)
      })}
    >
      <UiStack>
        <TextInput label="Amount" type="number" min={0} step={1} {...form.getInputProps('amount')} />
        <Group justify="right">
          {children}
          <Button type="submit">Save</Button>
        </Group>
      </UiStack>
    </form>
  )
}
