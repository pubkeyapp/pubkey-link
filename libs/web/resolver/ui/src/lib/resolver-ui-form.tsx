import { TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { AdminUpdateResolverInput, Resolver } from '@pubkey-link/sdk'

export function ResolverUiForm({
  resolver,
  submit,
}: {
  resolver: Resolver
  submit: (data: AdminUpdateResolverInput) => void
}) {
  const form = useForm<AdminUpdateResolverInput>({
    initialValues: {
      name: resolver.name ?? '',
    },
    onValuesChange: (values) => {
      submit(values)
    },
  })

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        submit(values)
      })}
    >
      <TextInput label="Name" placeholder="Enter name" key={form.key('name')} {...form.getInputProps('name')} />
    </form>
  )
}
