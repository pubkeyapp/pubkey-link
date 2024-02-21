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
      amountMax: item.amountMax ?? '',
    },
  })

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        return submit(values)
      })}
    >
      <UiStack>
        <TextInput
          label="Amount (Min)"
          description="Minimal amount of tokens to match"
          step="any"
          min="0"
          {...form.getInputProps('amount')}
        />
        <TextInput
          label="Amount (Max)"
          description="Maximum amount of tokens to match"
          step="any"
          min="0"
          {...form.getInputProps('amountMax')}
        />
        <Group justify="right">
          {children}
          <Button type="submit">Save</Button>
        </Group>
      </UiStack>
    </form>
  )
}
