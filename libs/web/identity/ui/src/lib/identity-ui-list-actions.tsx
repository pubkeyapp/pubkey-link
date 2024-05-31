import { ActionIcon, CSSProperties, Menu, rem } from '@mantine/core'
import { modals } from '@mantine/modals'
import {
  AppFeature,
  Identity,
  IdentityProvider,
  UserAddIdentityGrantInput,
  UserRemoveIdentityGrantInput,
  UserUpdateIdentityInput,
} from '@pubkey-link/sdk'
import { useAppConfig } from '@pubkey-link/web-core-data-access'
import { handleDebugModalClick } from '@pubkey-ui/core'
import { IconBug, IconDotsVertical, IconExternalLink, IconPencil, IconShare3, IconTrash } from '@tabler/icons-react'
import { IdentityGrantUiManager } from './identity-grant-ui-manager'
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
  const { hasFeature } = useAppConfig()
  const hasIdentityGrants = hasFeature(AppFeature.IdentityGrants)
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

  function manageIdentityGrants() {
    if (!hasIdentityGrants || !addIdentityGrant || !removeIdentityGrant) {
      return null
    }

    modals.open({
      title: 'Manage Identity Grants',
      centered: true,
      children: (
        <IdentityGrantUiManager
          item={identity}
          addGrant={async (input) => addIdentityGrant(input).then(() => modals.closeAll())}
          removeGrant={async (input) =>
            removeIdentityGrant(input).then(() => {
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
        {hasIdentityGrants && identity.provider === IdentityProvider.Solana ? (
          <Menu.Item leftSection={<IconShare3 style={style} />} onClick={manageIdentityGrants}>
            Identity Grants
          </Menu.Item>
        ) : null}
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
