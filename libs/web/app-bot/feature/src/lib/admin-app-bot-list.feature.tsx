import { Button, Group } from '@mantine/core'
import { useAdminFindManyAppBot } from '@pubkey-link/web-app-bot-data-access'
import { AdminAppBotUiTable } from '@pubkey-link/web-app-bot-ui'
import { UiPageLimit, UiSearchField } from '@pubkey-link/web-ui-core'
import { UiDebugModal, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'
import { Link } from 'react-router-dom'

export function AdminAppBotListFeature({ appId }: { appId: string }) {
  const { deleteAppBot, items, pagination, query, setSearch } = useAdminFindManyAppBot({ appId })

  return (
    <UiStack>
      <Group>
        <UiSearchField placeholder="Search bots" setSearch={setSearch} />
        <UiPageLimit limit={pagination.limit} setLimit={pagination.setLimit} setPage={pagination.setPage} />
        <UiDebugModal data={items} />
        <Button component={Link} to="create">
          Create
        </Button>
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <AdminAppBotUiTable
          deleteAppBot={(appBot) => {
            if (!window.confirm('Are you sure?')) return
            return deleteAppBot(appBot.id)
          }}
          appBots={items}
          page={pagination.page}
          totalRecords={pagination.total}
          recordsPerPage={pagination.limit}
          onPageChange={(page) => void pagination.setPage(page)}
        />
      ) : (
        <UiInfo message="No bots found" />
      )}
    </UiStack>
  )
}
