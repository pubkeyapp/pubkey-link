import { ActionIcon, CSSProperties, Menu, rem } from '@mantine/core'
import { modals } from '@mantine/modals'
import {
  Identity,
  IdentityProvider,
  UserAddIdentityGrantInput,
  UserRemoveIdentityGrantInput,
  UserUpdateIdentityInput,
} from '@pubkey-link/sdk'
import { handleDebugModalClick } from '@pubkey-ui/core'
import { IconBug, IconDotsVertical, IconExternalLink, IconPencil, IconTrash } from '@tabler/icons-react'
import { IdentityUiUpdateForm } from './identity-ui-update-form'

export function IdentityUiListActions({
  identity,
  deleteIdentity,
  updateIdentity,
  addIdentityGrant,
  removeIdentityGrant,
}: {
  identity: Identity
  deleteIdentity: (id: string) => Promise<void>
  updateIdentity: (id: string, input: UserUpdateIdentityInput) => Promise<void>
  addIdentityGrant?: (input: UserAddIdentityGrantInput) => Promise<void>
  removeIdentityGrant?: (input: UserRemoveIdentityGrantInput) => Promise<void>
}) {
  const style: CSSProperties = { width: rem(14), height: rem(14) }

  function renameIdentity() {
    modals.open({
      title: 'Rename identity',
      centered: true,
      children: (
        <IdentityUiUpdateForm
          item={identity}
          onSubmit={(res) =>
            updateIdentity(identity.id, res).then(() => {
              modals.closeAll()
            })
          }
        />
      ),
    })
  }

  return (
    <Menu shadow="md" position="bottom-end" withArrow>
      <Menu.Target>
        <ActionIcon variant="light" size="sm">
          <IconDotsVertical size={16} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          target="_blank"
          leftSection={<IconExternalLink style={style} />}
          component="a"
          href={identity.url ?? ''}
        >
          Visit identity on {identity.provider}
        </Menu.Item>
        <Menu.Item
          leftSection={<IconBug style={style} />}
          onClick={() => handleDebugModalClick({ data: identity, title: 'Identity' })}
        >
          Show debug data
        </Menu.Item>
        <Menu.Label>Advanced</Menu.Label>
        <Menu.Item
          disabled={identity.provider === IdentityProvider.Discord}
          leftSection={<IconPencil style={style} />}
          onClick={() => renameIdentity()}
        >
          Rename identity
        </Menu.Item>
        <Menu.Item
          disabled={identity.provider === IdentityProvider.Discord}
          color="red"
          onClick={async () => {
            if (!window.confirm('Are you sure?')) return
            await deleteIdentity(identity.id)
          }}
          leftSection={<IconTrash style={style} />}
        >
          Delete identity
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
