import { Button } from '@mantine/core'
import { CommunityMemberUiItem } from '@pubkey-link/web-community-member-ui'
import { useUserFindOneTeam } from '@pubkey-link/web-team-data-access'
import { UiCard, UiError, UiGroup, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'
import { UserTeamDetailAddMembersTab } from './user-team-detail-add-members-tab'

export function UserTeamDetailMembersTab({ teamId }: { teamId: string }) {
  const { addTeamMember, removeTeamMember, item, query } = useUserFindOneTeam({ teamId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Team not found." />
  }

  return (
    <UiCard>
      <UiStack>
        {item.members?.length ? (
          item.members?.map((member) => (
            <UiGroup key={member.id}>
              <CommunityMemberUiItem communityMember={member} />
              <Button variant="light" onClick={() => removeTeamMember(member.userId)}>
                Remove
              </Button>
            </UiGroup>
          ))
        ) : (
          <UiInfo message={`No members found for team ${item.name}`} />
        )}
      </UiStack>
      <UserTeamDetailAddMembersTab team={item} addMember={addTeamMember} />
    </UiCard>
  )
}
