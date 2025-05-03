import { AvatarProps, Group, type GroupProps, Stack, Text } from '@mantine/core'
import { ellipsify, NetworkCluster, NetworkToken } from '@pubkey-link/sdk'
import { AppUiDebugModal } from '@pubkey-link/web-core-ui'
import { NetworkUiClusterBadge } from '@pubkey-link/web-network-ui'
import { UiAnchor, type UiAnchorProps, UiCopy } from '@pubkey-ui/core'
import { NetworkTokenUiAvatar } from './network-token-ui-avatar'
import { NetworkTokenUiCache } from './network-token-ui-cache'
import { NetworkTokenUiExplorerIcon } from './network-token-ui-explorer-icon'
import { NetworkTokenUiTypeBadge } from './network-token-ui-type-badge'

export function NetworkTokenUiItem({
  anchorProps,
  avatarProps,
  details = true,
  groupProps,
  networkToken,
  to,
  cluster,
}: {
  anchorProps?: UiAnchorProps
  avatarProps?: Omit<AvatarProps, 'src'>
  details?: boolean
  groupProps?: GroupProps
  networkToken?: NetworkToken | null
  to?: string | null
  cluster?: NetworkCluster
}) {
  if (!networkToken) return null

  const account = (
    <Text size="sm" c="dimmed">
      {ellipsify(networkToken.account, 10)}
    </Text>
  )

  return (
    <UiAnchor to={to ?? undefined} underline="never" {...anchorProps}>
      <Group gap="sm" wrap="nowrap" {...groupProps}>
        <NetworkTokenUiAvatar networkToken={networkToken} {...avatarProps} />
        <Stack gap={4} align="start">
          <Group gap="xs" wrap="nowrap">
            <Text size="lg" fw={500}>
              {networkToken?.name}
            </Text>
            {details ? (
              <>
                <NetworkTokenUiTypeBadge type={networkToken.type} />
                <NetworkTokenUiCache token={networkToken} />
                <NetworkUiClusterBadge cluster={networkToken.cluster} size="xs" style={{ textTransform: 'inherit' }} />
              </>
            ) : null}
          </Group>
          {to ? (
            account
          ) : (
            <Group gap={4} wrap="nowrap">
              <UiCopy text={networkToken.account} tooltip="Copy token address" />
              <NetworkTokenUiExplorerIcon
                token={{ ...networkToken, cluster: networkToken.cluster ?? cluster }}
                label="View token on Explorer"
              />
              <AppUiDebugModal data={networkToken} />
            </Group>
          )}
        </Stack>
      </Group>
    </UiAnchor>
  )
}
