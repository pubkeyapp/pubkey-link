import { Button, Group, Stack } from '@mantine/core'
import { useForm } from '@mantine/form'
import { AdminUpdateResolverInput, Resolver } from '@pubkey-link/sdk'
import { UiCard, UiDebug } from '@pubkey-ui/core'
import { ResolverUiConfigEditor } from './resolver-ui-config-editor'
import { ResolverUiForm } from './resolver-ui-form'

export function AdminResolverUiUpdateForm({
  submit,
  resolver,
}: {
  submit: (res: AdminUpdateResolverInput) => Promise<boolean>
  resolver: Resolver
}) {
  const form = useForm<AdminUpdateResolverInput>({
    initialValues: {
      name: resolver.name ?? '',
      config: resolver.config ?? '',
    },
  })

  return (
    <Stack>
      <UiCard title="Resolver Config">
        <ResolverUiForm
          resolver={resolver}
          submit={(data) => {
            form.setFieldValue('name', data.name)
          }}
        />
      </UiCard>
      <ResolverUiConfigEditor
        resolver={resolver}
        submit={(data) => {
          form.setFieldValue('config', JSON.stringify(data))
        }}
      />
      <UiDebug data={form.values} />

      <form onSubmit={form.onSubmit((values) => submit(values))}>
        <Stack>
          <Group justify="right">
            <Button type="submit">Save</Button>
          </Group>
        </Stack>
      </form>
    </Stack>
  )
}
