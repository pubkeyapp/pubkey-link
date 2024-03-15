import { Button, Group } from '@mantine/core'
import { Team, User } from '@pubkey-link/sdk'
import { useUserFindManyCommunityMember } from '@pubkey-link/web-community-member-data-access'
import { UserUiAutocomplete } from '@pubkey-link/web-user-ui'
import { UiStack } from '@pubkey-ui/core'
import { useState } from 'react'

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
        disabled={!filtered.length}
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
