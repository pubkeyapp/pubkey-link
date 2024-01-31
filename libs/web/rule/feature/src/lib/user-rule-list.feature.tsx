import { Button, Group } from '@mantine/core'
import { modals } from '@mantine/modals'
import { Community } from '@pubkey-link/sdk'
import { useUserFindManyRule, useUserValidateRules } from '@pubkey-link/web-rule-data-access'
import { UserRuleUiTable } from '@pubkey-link/web-rule-ui'
import { UiSearchField } from '@pubkey-link/web-ui-core'
import { UiDebug, UiDebugModal, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'
import { Link } from 'react-router-dom'

export function UserRuleListFeature({ community }: { community: Community }) {
  const { deleteRule, items, pagination, query, setSearch } = useUserFindManyRule({
    communityId: community.id,
  })
  const validateRules = useUserValidateRules({ communityId: community.id })

  return (
    <UiStack>
      <Group>
        <UiSearchField placeholder="Search rule" setSearch={setSearch} />
        <UiDebugModal data={items} />

        <Button
          loading={validateRules.isPending}
          onClick={() => {
            validateRules.mutateAsync().then((result) => {
              modals.open({
                size: 'xl',
                children: <UiDebug data={result} open hideButton />,
              })
            })
          }}
        >
          Validate Rules
        </Button>

        <Button component={Link} to="create">
          Create
        </Button>
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <UserRuleUiTable
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
        <UiInfo message="No rules found." />
      )}
    </UiStack>
  )
}
