import { Anchor, SimpleGrid, Text } from '@mantine/core'
import { Community, CommunityRole } from '@pubkey-link/sdk'
import { UiCard, UiCardTitle, UiStack, UiWarning } from '@pubkey-ui/core'
import { CommunityDashboardAdminCardRoles } from './community-dashboard-admin-card-roles'
import { CommunityDashboardCardBot } from './community-dashboard-card-bot'
import { CommunityDashboardMemberCardRoles } from './community-dashboard-member-card-roles'

export default function UserCommunityDetailDashboardTab({
  community,
  role,
}: {
  community: Community
  role: CommunityRole
}) {
  switch (role) {
    case CommunityRole.Admin:
      return (
        <UiStack>
          <CommunityDashboardMember community={community} />
          <CommunityDashboardAdmin community={community} />
        </UiStack>
      )
    case CommunityRole.Member:
      return <CommunityDashboardMember community={community} />
  }
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
        <CommunityDashboardAdminCardRoles community={community} />
        <CommunityDashboardCardBot community={community} />
      </SimpleGrid>
    </UiStack>
  )
}
function CommunityDashboardMember({ community }: { community: Community }) {
  return (
    <UiStack>
      <UiWarning
        title="This page is under construction"
        message={
          <Text>
            We are working on this dashboard to make it better.{` `}
            <Anchor href="https://discord.gg/XxuZQeDPNf" target="_blank">
              Join our Discord
            </Anchor>{' '}
            to give us feedback.
          </Text>
        }
      />
      <CommunityDashboardMemberCardRoles community={community} />
    </UiStack>
  )
}
