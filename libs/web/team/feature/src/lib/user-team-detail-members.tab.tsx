import { Button, Group } from '@mantine/core'
import { Team, User } from '@pubkey-link/sdk'
import { useUserFindManyCommunityMember } from '@pubkey-link/web-community-member-data-access'
import { CommunityMemberUiItem } from '@pubkey-link/web-community-member-ui'
import { useUserFindOneTeam } from '@pubkey-link/web-team-data-access'
import { UserUiAutocomplete } from '@pubkey-link/web-user-ui'
import { UiCard, UiError, UiGroup, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'
import { useState } from 'react'

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

export function UserTeamDetailAddMembersTab({ team, addMember }: { team: Team; addMember: (userId: string) => void }) {
  const { items, query, setSearch } = useUserFindManyCommunityMember({
    communityId: team.communityId,
    limit: 10,
  })
  const [userId, setUserId] = useState<string | undefined>(undefined)

  const users: User[] = items.map((item) => item.user) as User[]
  const filtered = users.filter((user) => !team.members?.find((member) => member.userId === user.id))

  return (
    <UiStack>
      <UserUiAutocomplete
        label="Search for members to add to the team."
        items={filtered}
        isLoading={query.isLoading}
        setSearch={setSearch}
        select={(user) => setUserId(user?.id)}
      />
      <Group justify="flex-end">
        <Button
          disabled={!userId}
          onClick={() => {
            if (!userId) return
            addMember(userId)
            setUserId(undefined)
          }}
        >
          Add Member
        </Button>
      </Group>
    </UiStack>
  )
}
