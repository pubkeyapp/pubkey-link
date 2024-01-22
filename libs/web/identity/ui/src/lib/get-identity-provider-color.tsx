import { IdentityProvider } from '@pubkey-link/sdk'

export function getIdentityProviderColor(provider: IdentityProvider) {
  switch (provider) {
    case IdentityProvider.Discord:
      return '#5865F2'
    case IdentityProvider.GitHub:
      return '#333333'
    case IdentityProvider.Google:
      return '#DB4437'
    case IdentityProvider.Solana:
      return '#9945FF'
    case IdentityProvider.Twitter:
      return '#1DA1F2'
    default:
      return '#333333'
  }
}
