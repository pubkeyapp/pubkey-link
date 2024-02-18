import { IdentityProvider } from '@pubkey-link/sdk'
import { IconBrandDiscordFilled, IconCurrencySolana, IconQuestionMark } from '@tabler/icons-react'

export function IdentityUiIcon({ provider, size }: { provider: IdentityProvider; size?: number }) {
  switch (provider) {
    case IdentityProvider.Discord:
      return <IconBrandDiscordFilled size={size} />
    case IdentityProvider.Solana:
      return <IconCurrencySolana size={size} />
    default:
      return <IconQuestionMark size={size} />
  }
}
