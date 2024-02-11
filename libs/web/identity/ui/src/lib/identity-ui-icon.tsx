import { IdentityProvider } from '@pubkey-link/sdk'
import { IconBrandDiscord, IconCurrencySolana, IconQuestionMark } from '@tabler/icons-react'

export function IdentityUiIcon({ provider, size }: { provider: IdentityProvider; size?: number }) {
  switch (provider) {
    case IdentityProvider.Discord:
      return <IconBrandDiscord size={size} />
    case IdentityProvider.Solana:
      return <IconCurrencySolana size={size} />
    default:
      return <IconQuestionMark size={size} />
  }
}
