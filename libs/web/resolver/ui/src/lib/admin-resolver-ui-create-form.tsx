import { Button, Group, SegmentedControl, Stack, Text } from '@mantine/core'
import { useForm } from '@mantine/form'
import { AdminCreateResolverInput, getEnumOptions, NetworkCluster, ResolverType } from '@pubkey-link/sdk'

export function AdminResolverUiCreateForm({
  cluster,
  submit,
}: {
  cluster: NetworkCluster
  submit: (res: AdminCreateResolverInput) => Promise<boolean>
}) {
  const form = useForm<AdminCreateResolverInput>({
    initialValues: {
      cluster,
      type: ResolverType.HeliusCollectionAssets,
      config: '{}',
    },
  })

  const options = getEnumOptions(ResolverType)

  return (
    <form onSubmit={form.onSubmit((values) => submit(values))}>
      <Stack align="flex-start" gap={2}>
        <Text size="sm" fw={500}>
          Resolver Type
        </Text>
        <Text size="xs" c="dimmed">
          The Resolver Type determines which API is used to resolve the network assets
        </Text>
        <SegmentedControl
          orientation="vertical"
          color="brand"
          data={options}
          key={form.key('type')}
          {...form.getInputProps('type')}
        />
      </Stack>

      <Group justify="right">
        <Button type="submit">Create</Button>
      </Group>
    </form>
  )
}
