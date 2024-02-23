import { Button } from '@mantine/core'
import { modals } from '@mantine/modals'
import { UserCreateCommunityMemberInput } from '@pubkey-link/sdk'

import { UserCreateCommunityMemberForm } from './user-create-community-member-form'

export function UserCreateCommunityMemberModal({
  create,
}: {
  create: (input: UserCreateCommunityMemberInput) => Promise<void>
}) {
  return (
    <Button
      onClick={() => {
        modals.open({
          centered: true,
          title: 'Add Member',
          children: <UserCreateCommunityMemberForm create={(input) => create(input).then(() => modals.closeAll())} />,
        })
      }}
    >
      Add Member
    </Button>
  )
}
