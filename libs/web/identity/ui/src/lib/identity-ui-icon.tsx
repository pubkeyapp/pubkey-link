import { IdentityProvider } from '@pubkey-link/sdk'
import {
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandTwitter,
  IconCurrencySolana,
  IconQuestionMark,
} from '@tabler/icons-react'

export function IdentityUiIcon({ provider, size }: { provider: IdentityProvider; size?: number }) {
  switch (provider) {
    case IdentityProvider.Discord:
      return <IconBrandDiscord size={size} />
    case IdentityProvider.GitHub:
      return <IconBrandGithub size={size} />
    case IdentityProvider.Google:
      return <IconBrandGoogle size={size} />
    case IdentityProvider.Solana:
      return <IconCurrencySolana size={size} />
    case IdentityProvider.Twitter:
      return <IconBrandTwitter size={size} />
    default:
      return <IconQuestionMark size={size} />
  }
}
