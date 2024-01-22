import { Group, Stack } from '@mantine/core'
import { ellipsify } from '@pubkey-link/sdk'
import { SolanaUiExplorerLink } from '@pubkey-link/web-solana-ui'
import { UiCard, UiDebugModal } from '@pubkey-ui/core'
import { useCounterProgramAccount } from '../data-access/counter-program-account-provider'
import { CounterCloseButton } from './counter-close-button'
import { CounterDecrementButton } from './counter-decrement-button'
import { CounterIncrementButton } from './counter-increment-button'
import { CounterValueButton } from './counter-value-button'

export function ProgramCounterAccount() {
  const { account } = useCounterProgramAccount()

  return (
    <UiCard
      withBorder
      title={
        <Group justify="space-between">
          <SolanaUiExplorerLink
            fw="bold"
            fz="xl"
            label={ellipsify(account.publicKey.toString())}
            path={`account/${account.publicKey}`}
            copyValue={account.publicKey.toString()}
            copyLabel="Copy address"
          />
          <Group gap="xs">
            <UiDebugModal size="lg" data={account} />
            <CounterCloseButton />
          </Group>
        </Group>
      }
      key={account.publicKey.toString()}
    >
      <Stack>
        <Group justify="center">
          <Group gap="xs">
            <CounterDecrementButton />
            <CounterValueButton />
            <CounterIncrementButton />
          </Group>
        </Group>
      </Stack>
    </UiCard>
  )
}
