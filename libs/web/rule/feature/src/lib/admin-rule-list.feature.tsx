import { Button, Group } from '@mantine/core'
import { UiPageLimit, UiSearchField } from '@pubkey-link/web-ui-core'
import { useAdminFindManyRule } from '@pubkey-link/web-rule-data-access'
import { AdminRuleUiTable } from '@pubkey-link/web-rule-ui'
import { UiBack, UiDebugModal, UiInfo, UiLoader, UiPage } from '@pubkey-ui/core'
import { Link } from 'react-router-dom'

export function AdminRuleListFeature({ communityId }: { communityId: string }) {
  const { deleteRule, items, pagination, query, setSearch } = useAdminFindManyRule({
    communityId,
  })

  return (
    <UiPage
      title="Rules"
      leftAction={<UiBack />}
      rightAction={
        <Group>
          <UiDebugModal data={items} />
          <Button component={Link} to="create">
            Create
          </Button>
        </Group>
      }
    >
      <Group>
        <UiSearchField placeholder="Search rule" setSearch={setSearch} />
        <UiPageLimit limit={pagination.limit} setLimit={pagination.setLimit} setPage={pagination.setPage} />
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <AdminRuleUiTable
          deleteRule={(rule) => {
            if (!window.confirm('Are you sure?')) return
            return deleteRule(rule.id)
          }}
          rules={items}
          page={pagination.page}
          totalRecords={pagination.total}
          recordsPerPage={pagination.limit}
          onPageChange={(page) => void pagination.setPage(page)}
        />
      ) : (
        <UiInfo message="No rules found" />
      )}
    </UiPage>
  )
}
