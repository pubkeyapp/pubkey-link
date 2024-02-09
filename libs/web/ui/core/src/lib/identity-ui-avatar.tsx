import { Avatar, AvatarProps, getGradient, Tooltip } from '@mantine/core'
import { ellipsify, Identity, IdentityProvider, solanaGradient } from '@pubkey-link/sdk'
import { IconCurrencySolana } from '@tabler/icons-react'

export function IdentityUiAvatar({
  item,
  withTooltip = false,
  ...props
}: AvatarProps & { item: Identity; withTooltip?: boolean }) {
  const content =
    item.provider === IdentityProvider.Solana ? (
      <Avatar
        radius={100}
        styles={(theme) => ({
          root: { background: getGradient(solanaGradient, theme) },
          placeholder: { background: 'transparent', color: 'white' },
        })}
        {...props}
      >
        <IconCurrencySolana size={28} />
      </Avatar>
    ) : item.avatarUrl ? (
      <Avatar radius={100} src={item.avatarUrl} alt={`${item.provider} avatar`} {...props} />
    ) : (
      <Avatar radius={100} {...props}>
        {item.profile?.username.substring(0, 1)}
      </Avatar>
    )

  return withTooltip ? (
    <Tooltip label={`${item.profile?.username ?? ellipsify(item.providerId)} on ${item.provider}`} withArrow>
      {content}
    </Tooltip>
  ) : (
    content
  )
}
