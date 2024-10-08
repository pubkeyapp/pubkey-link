import { Button, Group } from '@mantine/core'
import { useAdminFindManyBot } from '@pubkey-link/web-bot-data-access'
import { AdminBotUiTable } from '@pubkey-link/web-bot-ui'
import { UiPageLimit, UiSearchField } from '@pubkey-link/web-core-ui'
import { UiDebugModal, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'
import { Link } from 'react-router-dom'

export function AdminBotListFeature({ communityId }: { communityId: string }) {
  const { deleteBot, items, pagination, query, setSearch } = useAdminFindManyBot({
    communityId,
  })

  return (
    <UiStack>
      <Group>
        <UiSearchField placeholder="Search bot" setSearch={setSearch} />
        <UiPageLimit limit={pagination.limit} setLimit={pagination.setLimit} setPage={pagination.setPage} />
        <UiDebugModal data={items} />
        <Button component={Link} to="create">
          Create
        </Button>
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <AdminBotUiTable
          deleteBot={(bot) => {
            if (!window.confirm('Are you sure?')) return
            return deleteBot(bot.id)
          }}
          bots={items}
          page={pagination.page}
          totalRecords={pagination.total}
          recordsPerPage={pagination.limit}
          onPageChange={(page) => void pagination.setPage(page)}
        />
      ) : (
        <UiInfo message="No bots found." />
      )}
    </UiStack>
  )
}
