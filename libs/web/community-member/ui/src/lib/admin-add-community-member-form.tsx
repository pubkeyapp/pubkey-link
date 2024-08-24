import { Button, Checkbox, Group } from '@mantine/core'
import { AdminAddCommunityMemberInput, User } from '@pubkey-link/sdk'
import { UserUiSearch } from '@pubkey-link/web-user-ui'
import { UiStack } from '@pubkey-ui/core'
import { useState } from 'react'

export function AdminAddCommunityMemberForm({
  create,
}: {
  create: (input: AdminAddCommunityMemberInput) => Promise<void>
}) {
  const [userResult, setUserResult] = useState<User | undefined>(undefined)
  const [admin, setAdmin] = useState(false)
  return (
    <UiStack>
      <Checkbox
        label="Admin"
        description="This member is an admin of the community."
        checked={admin}
        onChange={() => setAdmin(!admin)}
      />
      <UserUiSearch description="Search for a user to add to the community" select={setUserResult} />
      <Group justify="end">
        <Button
          disabled={!userResult?.id}
          onClick={() => {
            if (!userResult?.id) return
            return create({ userId: userResult?.id, admin })
          }}
        >
          Add Member
        </Button>
      </Group>
    </UiStack>
  )
}
