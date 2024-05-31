import { ActionIcon } from '@mantine/core'
import { Identity, IdentityProvider } from '@pubkey-link/sdk'
import { IconRefresh } from '@tabler/icons-react'

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
