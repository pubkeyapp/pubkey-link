import { ActionIcon, Group, ScrollArea } from '@mantine/core'
import { IdentityGrant, UserRemoveIdentityGrantInput } from '@pubkey-link/sdk'
import { UserUiItem } from '@pubkey-link/web-user-ui'
import { IconTrash } from '@tabler/icons-react'
import { DataTable } from 'mantine-datatable'

export function IdentityGrantUiTable({
  removeGrant,
  grants = [],
}: {
  removeGrant: (input: UserRemoveIdentityGrantInput) => Promise<void>
  grants: IdentityGrant[]
}) {
  return (
    <ScrollArea>
      <DataTable
        borderRadius="sm"
        withTableBorder
        shadow="xs"
        columns={[
          {
            accessor: 'user',
            render: (item) => (item.grantee ? <UserUiItem user={item.grantee} /> : null),
          },
          {
            accessor: 'actions',
            title: 'Actions',
            textAlign: 'right',
            render: (item) => (
              <Group gap="xs" justify="right">
                <ActionIcon
                  color="red"
                  variant="light"
                  size="sm"
                  onClick={() =>
                    removeGrant({
                      granteeId: item.granteeId,
                      provider: item.provider,
                      providerId: item.providerId,
                    })
                  }
                >
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            ),
          },
        ]}
        records={grants}
      />
    </ScrollArea>
  )
}
