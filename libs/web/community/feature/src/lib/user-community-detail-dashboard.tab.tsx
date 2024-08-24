import { SimpleGrid } from '@mantine/core'
import { Community, CommunityMember } from '@pubkey-link/sdk'
import { UiCard, UiCardTitle, UiStack } from '@pubkey-ui/core'
import { CommunityDashboardCardBot } from './community-dashboard-card-bot'
import { CommunityDashboardMemberCardRoles } from './community-dashboard-member-card-roles'

export default function UserCommunityDetailDashboardTab({
  community,
  member,
}: {
  community: Community
  member: CommunityMember
}) {
  return member.admin ? (
    <UiStack>
      <CommunityDashboardMember community={community} />
      <CommunityDashboardAdmin community={community} />
    </UiStack>
  ) : (
    <CommunityDashboardMember community={community} />
  )
}

function CommunityDashboardAdmin({ community }: { community: Community }) {
  return (
    <UiStack>
      <UiCard>
        <UiStack>
          <UiCardTitle>Admin Dashboard</UiCardTitle>
        </UiStack>
      </UiCard>
      <SimpleGrid cols={{ base: 0, xl: 2 }} spacing={20}>
        <CommunityDashboardCardBot community={community} />
      </SimpleGrid>
    </UiStack>
  )
}
function CommunityDashboardMember({ community }: { community: Community }) {
  return (
    <UiStack>
      <CommunityDashboardMemberCardRoles community={community} />
    </UiStack>
  )
}
