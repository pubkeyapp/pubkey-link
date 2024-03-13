import { Button } from '@mantine/core'
import { modals } from '@mantine/modals'
import { UserAddCommunityMemberInput } from '@pubkey-link/sdk'

import { UserAddCommunityMemberForm } from './user-add-community-member-form'

export function UserAddCommunityMemberModal({ add }: { add: (input: UserAddCommunityMemberInput) => Promise<void> }) {
  return (
    <Button
      onClick={() => {
        modals.open({
          centered: true,
          title: 'Add Member',
          children: <UserAddCommunityMemberForm create={(input) => add(input).then(() => modals.closeAll())} />,
        })
      }}
    >
      Add Member
    </Button>
  )
}
