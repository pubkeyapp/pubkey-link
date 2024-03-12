import { Avatar, Tooltip } from '@mantine/core'
import { Identity } from '@pubkey-link/sdk'
import { IdentityUiAvatar } from './identity-ui-avatar'

export function IdentityUiAvatarGroup({ identities, limit = 5 }: { identities: Identity[]; limit?: number }) {
  const visible = identities.slice(0, limit)

  return (
    <Tooltip.Group openDelay={300} closeDelay={100}>
      <Avatar.Group spacing="sm">
        {visible.map((identity) => (
          <IdentityUiAvatar key={identity.id} item={identity} withTooltip />
        ))}
        {identities.length > limit ? (
          <Tooltip label={`${identities.length - limit} more`} withArrow>
            <Avatar radius="xl">+{identities.length - limit}</Avatar>
          </Tooltip>
        ) : null}
      </Avatar.Group>
    </Tooltip.Group>
  )
}
