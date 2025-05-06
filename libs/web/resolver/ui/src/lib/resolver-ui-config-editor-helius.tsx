import { Anchor, PasswordInput, SegmentedControl, Stack, Text } from '@mantine/core'
import { useForm } from '@mantine/form'
import { NetworkCluster, ResolverConfigHelius, ResolverConfigHeliusSchema } from '@pubkey-link/sdk'
import { UiAlert } from '@pubkey-ui/core'
import { HeliusCluster } from 'helius-sdk'
import { zodResolver } from 'mantine-form-zod-resolver'

export function getHeliusClusterFromNetworkCluster(cluster: NetworkCluster): HeliusCluster {
  switch (cluster) {
    case NetworkCluster.SolanaMainnet:
      return 'mainnet-beta'
    case NetworkCluster.SolanaDevnet:
      return 'devnet'
    default:
      return 'mainnet-beta'
  }
}

export function ResolverUiConfigEditorHelius({
  cluster,
  config,
  submit,
}: {
  cluster: NetworkCluster
  config: ResolverConfigHelius
  submit: (data: ResolverConfigHelius) => void
}) {
  const form = useForm<ResolverConfigHelius>({
    mode: 'uncontrolled',
    initialValues: {
      heliusApiKey: config?.heliusApiKey ?? '',
      heliusCluster: getHeliusClusterFromNetworkCluster(cluster),
    },
    validate: zodResolver(ResolverConfigHeliusSchema),
    onValuesChange: (values) => {
      submit(values)
    },
  })

  if (cluster !== NetworkCluster.SolanaMainnet && cluster !== NetworkCluster.SolanaDevnet) {
    return <UiAlert message="Helius is only available for mainnet and devnet" />
  }

  const heliusClusterOptions = ResolverConfigHeliusSchema.shape.heliusCluster.options

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        submit(values)
      })}
    >
      <Stack>
        <PasswordInput
          label="Helius API Key"
          description={
            <Text span fz="inherit">
              Get your Helius API Key from{' '}
              <Anchor fz="inherit" href="https://dashboard.helius.dev" target="_blank" rel="noreferrer noopener">
                https://dashboard.helius.dev
              </Anchor>
            </Text>
          }
          placeholder="Enter Helius API Key"
          key={form.key('heliusApiKey')}
          {...form.getInputProps('heliusApiKey')}
        />
        <Stack align="flex-start" gap={2}>
          <Text size="sm" fw={500}>
            Helius Cluster
          </Text>
          <Text size="xs" c="dimmed">
            The Helius Cluster is automatically set based on the network cluster
          </Text>
          <SegmentedControl
            color="brand"
            readOnly
            data={heliusClusterOptions}
            key={form.key('heliusCluster')}
            {...form.getInputProps('heliusCluster')}
          />
        </Stack>
      </Stack>
    </form>
  )
}
