import { Button, Group, SimpleGrid } from '@mantine/core'
import { UiInfo, UiLoader, UiPage } from '@pubkey-ui/core'
import { Keypair } from '@solana/web3.js'
import { CounterProgramAccountProvider } from './data-access/counter-program-account-provider'
import { useCounterFetchAll } from './data-access/use-counter-fetch-all'
import { useCounterInitialize } from './data-access/use-counter-initialize'
import { ProgramCounterAccount } from './ui/program-counter-account'

export function CounterListFeature() {
  const fetchAllQuery = useCounterFetchAll()
  const initializeQuery = useCounterInitialize()

  return (
    <UiPage
      title="Counter"
      rightAction={
        <Group>
          <Button
            variant="light"
            disabled={initializeQuery.isPending}
            onClick={() => initializeQuery.mutateAsync({ keypair: Keypair.generate() })}
          >
            Create
          </Button>
          <Group>
            <Button
              variant="light"
              onClick={() => fetchAllQuery.refetch()}
              loading={fetchAllQuery.isLoading || fetchAllQuery.isFetching}
            >
              Refresh
            </Button>
          </Group>
        </Group>
      }
    >
      {fetchAllQuery.isLoading ? (
        <UiLoader />
      ) : (
        <SimpleGrid cols={2}>
          {fetchAllQuery.data?.length ? (
            fetchAllQuery.data.map((account) => (
              <CounterProgramAccountProvider account={account} key={account.publicKey.toString()}>
                <ProgramCounterAccount />
              </CounterProgramAccountProvider>
            ))
          ) : (
            <UiInfo title="No accounts found" message="Create an account to get started." />
          )}
        </SimpleGrid>
      )}
    </UiPage>
  )
}
