import { Accordion, Button, Group, Text } from '@mantine/core'
import { useSdk } from '@pubkey-link/web-core-data-access'
import {
  toastError,
  toastSuccess,
  UiCard,
  UiCardTitle,
  UiDebug,
  UiGroup,
  UiInfo,
  UiLoader,
  UiStack,
} from '@pubkey-ui/core'
import { useMutation, useQuery } from '@tanstack/react-query'

export function DevBackup() {
  const sdk = useSdk()
  const query = useQuery({
    queryKey: ['backup', 'get-backups'],
    queryFn: () => sdk.adminGetBackups(),
  })
  const mutationCreate = useMutation({
    mutationKey: ['backup', 'create'],
    mutationFn: () => sdk.adminCreateBackup(),
  })
  const mutationFetch = useMutation({
    mutationKey: ['backup', 'fetch'],
    mutationFn: (url: string) => sdk.adminFetchBackup({ url }),
  })

  return (
    <UiCard>
      <UiStack>
        <UiGroup>
          <UiCardTitle>Backup</UiCardTitle>
          <Group>
            <Button
              onClick={() => {
                const url = window.prompt('Enter backup url')
                if (!url) return
                return mutationFetch
                  .mutateAsync(url)
                  .then(async (res) => {
                    if (res.data.fetched) {
                      toastSuccess('Backup fetched')
                      await query.refetch()
                      return
                    }
                    toastError('Backup fetch failed')
                    await query.refetch()
                  })
                  .catch((err) => toastError(`Error: ${err.message}`))
              }}
            >
              Fetch Backup
            </Button>
            <Button
              onClick={() =>
                mutationCreate
                  .mutateAsync()
                  .then(async (res) => {
                    if (res.data.created) {
                      toastSuccess('Backup created')
                      await query.refetch()
                      return
                    }
                    toastError('Backup failed')
                    await query.refetch()
                  })
                  .catch((err) => toastError(`Error: ${err.message}`))
              }
            >
              Create Backup
            </Button>
          </Group>
        </UiGroup>
        {query.isLoading ? (
          <UiLoader />
        ) : query.data?.data.items ? (
          <Accordion multiple variant="separated">
            {query.data?.data.items.map((name) => (
              <Accordion.Item key={name} value={name}>
                <Accordion.Control>
                  <Text ff="mono">{name}</Text>
                </Accordion.Control>
                <Accordion.Panel>
                  <DevBackupPanel name={name} refresh={() => query.refetch()} />
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        ) : (
          <UiInfo message={<div>No backups found</div>} />
        )}
      </UiStack>
    </UiCard>
  )
}

export function DevBackupPanel({ name, refresh }: { name: string; refresh: () => void }) {
  const sdk = useSdk()
  const query = useQuery({
    queryKey: ['backup', 'get-backup', { name }],
    queryFn: () => sdk.adminGetBackup({ name }).then((res) => res.data),
    enabled: false,
  })
  const mutationDelete = useMutation({
    mutationKey: ['backup', 'delete', { name }],
    mutationFn: () => sdk.adminDeleteBackup({ name }).then((res) => res.data),
  })

  const mutationRestore = useMutation({
    mutationKey: ['backup', 'restore', { name }],
    mutationFn: () => sdk.adminRestoreBackup({ name }).then((res) => res.data),
  })

  return (
    <UiStack>
      <UiDebug data={query.data?.item ?? 'None'} open />
      <Group justify="end">
        <Button onClick={() => query.refetch()} disabled={query.isLoading}>
          Get Backup Info
        </Button>
        <Button
          onClick={() => {
            if (!window.confirm('Are you sure?')) return
            return mutationDelete
              .mutateAsync()
              .then(async (res) => {
                if (res?.deleted) {
                  toastSuccess('Backup deleted')
                  refresh()
                  return
                }
                toastError('Backup failed')
                refresh()
              })
              .catch((err) => toastError(`Error: ${err.message}`))
          }}
        >
          Delete
        </Button>
        <Button
          onClick={() =>
            mutationRestore
              .mutateAsync()
              .then(async (res) => {
                if (res?.restored) {
                  toastSuccess('Backup restored')
                  refresh()
                  return
                }
                toastError('Backup failed')
                refresh()
              })
              .catch((err) => toastError(`Error: ${err.message}`))
          }
        >
          Restore
        </Button>
      </Group>
    </UiStack>
  )
}
