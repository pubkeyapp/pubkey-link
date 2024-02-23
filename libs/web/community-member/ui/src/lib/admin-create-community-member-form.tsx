import { Button, Group } from '@mantine/core'
import { AdminCreateCommunityMemberInput, CommunityRole, User } from '@pubkey-link/sdk'
import { CommunityUiSelectRole } from '@pubkey-link/web-community-ui'
import { UserUiSearch } from '@pubkey-link/web-user-ui'
import { UiStack } from '@pubkey-ui/core'
import { useState } from 'react'

export function AdminCreateCommunityMemberForm({
  create,
}: {
  create: (input: AdminCreateCommunityMemberInput) => Promise<void>
}) {
  const [userResult, setUserResult] = useState<User | undefined>(undefined)
  const [role, communityRole] = useState<CommunityRole>(CommunityRole.Member)
  return (
    <UiStack>
      <CommunityUiSelectRole
        label="Role"
        description="Select the role for the user"
        value={role}
        setValue={(role) => {
          if (role) {
            communityRole(role)
          }
        }}
      />
      <UserUiSearch description="Search for a user to add to the community" select={setUserResult} />
      <Group justify="end">
        <Button
          disabled={!userResult?.id || !role}
          onClick={() => {
            if (!userResult?.id) return
            return create({ userId: userResult?.id, role: role })
          }}
        >
          Add Member
        </Button>
      </Group>
    </UiStack>
  )
}
