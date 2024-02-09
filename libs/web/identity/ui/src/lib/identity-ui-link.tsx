import { ActionIcon, Tooltip } from '@mantine/core'
import { Identity, IdentityProvider } from '@pubkey-link/sdk'
import { IconExternalLink, IconRefresh } from '@tabler/icons-react'

export function IdentityRefreshIcon({ item, onClick }: { item: Identity; onClick: (itemId: string) => void }) {
  if (item.provider !== IdentityProvider.Solana) {
    return null
  }
  return (
    <ActionIcon onClick={() => onClick(item.id)} size="sm" color="brand" variant="light">
      <IconRefresh size={16} />
    </ActionIcon>
  )
}
export function IdentityUiLink({ item }: { item: Identity }) {
  return item.url ? (
    <Tooltip label={`Visit identity on ${item.provider}`} withArrow position="top">
      <ActionIcon size="sm" color="brand" variant="light" component="a" href={item.url} target="_blank">
        <IconExternalLink size={16} />
      </ActionIcon>
    </Tooltip>
  ) : null
}
