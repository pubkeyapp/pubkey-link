import { Button } from '@mantine/core'
import { modals } from '@mantine/modals'
import { AdminAddCommunityMemberInput } from '@pubkey-link/sdk'
import { AdminAddCommunityMemberForm } from './admin-add-community-member-form'

export function AdminAddCommunityMemberModal({
  create,
}: {
  create: (input: AdminAddCommunityMemberInput) => Promise<void>
}) {
  return (
    <Button
      variant="light"
      onClick={() => {
        modals.open({
          centered: true,
          title: 'Add Member',
          children: <AdminAddCommunityMemberForm create={(input) => create(input).then(() => modals.closeAll())} />,
        })
      }}
    >
      Add Member
    </Button>
  )
}
