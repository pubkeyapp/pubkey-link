import { ActionIcon, Tooltip } from '@mantine/core'
import { toastWarning } from '@pubkey-ui/core'

import { useCounterFetch } from '../data-access/use-counter-fetch'
import { useCounterSet } from '../data-access/use-counter-set'
import { useCounterProgramAccount } from '../data-access/counter-program-account-provider'

export function CounterValueButton() {
  const { account } = useCounterProgramAccount()
  const counterQuery = useCounterFetch({ account: account.publicKey })
  const counterSet = useCounterSet()

  const value = counterQuery.data?.count.toString() ?? '0'

  return (
    <Tooltip label="Set counter value">
      <ActionIcon
        variant="light"
        size="xl"
        loading={counterQuery.isLoading || counterSet.isPending}
        onClick={() => {
          const input = parseInt(prompt('Enter a value to set the counter to:', value) || '0')
          if (isNaN(input) || input < 0 || input === Number(value)) {
            toastWarning({ message: 'Invalid input' })
            return
          }
          return counterSet.mutateAsync(input)
        }}
      >
        {value}
      </ActionIcon>
    </Tooltip>
  )
}
