import { Badge, Button, Group, Table } from '@mantine/core'
import { ScheduledJob } from '@pubkey-link/sdk'
import { useAdminScheduledJobs } from '@pubkey-link/web-schedule-data-access'
import { UiBack, UiDebugModal, UiLoader, UiPage, UiStack, UiTime } from '@pubkey-ui/core'

export function AdminScheduleJobsFeature() {
  const { isLoading, data, refetch } = useAdminScheduledJobs()

  return (
    <UiPage
      title="Scheduled Jobs"
      leftAction={<UiBack />}
      rightAction={
        <Group>
          <Button size="xs" variant="light" onClick={() => refetch()}>
            Refresh
          </Button>
          <UiDebugModal data={data} />
        </Group>
      }
    >
      {isLoading ? (
        <UiLoader />
      ) : data ? (
        <UiStack>
          <ScheduleUiJobTable jobs={data} />
        </UiStack>
      ) : (
        <div>No status</div>
      )}
    </UiPage>
  )
}

function ScheduleUiJobTable({ jobs }: { jobs: ScheduledJob[] }) {
  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Name</Table.Th>
          <Table.Th>Running</Table.Th>
          <Table.Th>Run Once</Table.Th>
          <Table.Th>Cron Time</Table.Th>
          <Table.Th>Last Execution</Table.Th>
          <Table.Th>Next Execution</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {jobs.map(({ name, job }) => (
          <Table.Tr key={name}>
            <Table.Td>{name}</Table.Td>
            <Table.Td>
              <Badge color={job.running === 'true' ? 'green' : 'gray'}>
                {job.running === 'true' ? 'Running' : 'Not Running'}
              </Badge>
            </Table.Td>
            <Table.Td>{job.runOnce}</Table.Td>
            <Table.Td>{job.cronTime}</Table.Td>
            <Table.Td>{job.lastExecution?.length ? <UiTime date={new Date(job.lastExecution)} /> : 'Never'}</Table.Td>
            <Table.Td>{job.nextExecution?.length ? <UiTime date={new Date(job.nextExecution)} /> : 'N/A'}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  )
}
