import { Button, Group, JsonInput, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { RoleCondition, UserUpdateRoleConditionInput } from '@pubkey-link/sdk'
import { UiStack } from '@pubkey-ui/core'
import { ReactNode } from 'react'

export function RoleConditionUiUpdateFormNonFungible({
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
      config: JSON.stringify(item.config ?? {}),
      filters: JSON.stringify(item.filters ?? {}),
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
        <JsonInput
          label="Filters"
          placeholder="Textarea will autosize to fit the content"
          validationError="Invalid JSON"
          formatOnBlur
          autosize
          minRows={4}
          {...form.getInputProps('filters')}
        />
        <Group justify="right">
          {children}
          <Button type="submit">Save</Button>
        </Group>
      </UiStack>
    </form>
  )
}
