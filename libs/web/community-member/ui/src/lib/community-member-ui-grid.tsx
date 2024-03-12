import { Group, Pagination, SimpleGrid } from '@mantine/core'
import { CommunityMember } from '@pubkey-link/sdk'
import { gridLimits, UiPageLimit } from '@pubkey-link/web-core-ui'
import { UiDebugModal, UiGroup, UiStack } from '@pubkey-ui/core'
import { DataTableProps } from 'mantine-datatable'
import { CommunityMemberUiGridItem } from './community-member-ui-grid-item'

export function CommunityMemberUiGrid({
  communityMembers = [],
  onPageChange,
  page,
  totalRecords,
  limit,
  setLimit,
  setPage,
}: {
  communityMembers: CommunityMember[]
  page: DataTableProps['page']
  totalRecords: number
  onPageChange: (page: number) => void
  limit: number
  setLimit: (limit: number) => void
  setPage: (page: number) => void
}) {
  const totalPages = totalRecords / limit + 1
  return (
    <UiStack>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
        {communityMembers.map((communityMember) => (
          <CommunityMemberUiGridItem
            key={communityMember.id}
            to={communityMember.id}
            communityMember={communityMember}
          />
        ))}
      </SimpleGrid>
      <UiGroup>
        <Pagination disabled={totalPages < 2} total={totalPages} value={page} onChange={onPageChange} />
        <Group>
          <UiDebugModal data={communityMembers} />
          <UiPageLimit data={gridLimits} limit={limit} setLimit={setLimit} setPage={setPage} />
        </Group>
      </UiGroup>
    </UiStack>
  )
}
