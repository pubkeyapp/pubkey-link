import { Button } from '@mantine/core'
import { modals } from '@mantine/modals'
import { AdminCreateCommunityMemberInput } from '@pubkey-link/sdk'
import { AdminCreateCommunityMemberForm } from './admin-create-community-member-form'

export function AdminCreateCommunityMemberModal({
  create,
}: {
  create: (input: AdminCreateCommunityMemberInput) => Promise<void>
}) {
  return (
    <Button
      variant="light"
      onClick={() => {
        modals.open({
          centered: true,
          title: 'Add Member',
          children: <AdminCreateCommunityMemberForm create={(input) => create(input).then(() => modals.closeAll())} />,
        })
      }}
    >
      Add Member
    </Button>
  )
}
