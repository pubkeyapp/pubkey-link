import { IdentityProvider } from '@pubkey-link/sdk'

export function getIdentityProviderColor(provider: IdentityProvider) {
  switch (provider) {
    case IdentityProvider.Discord:
      return '#5865F2'
    case IdentityProvider.Solana:
      return '#9945FF'
    default:
      return '#333333'
  }
}
