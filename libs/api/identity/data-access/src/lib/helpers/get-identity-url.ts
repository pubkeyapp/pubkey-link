import { IdentityProvider } from '@prisma/client'
import { Identity } from '../entity/identity.entity'

export function getIdentityUrl(identity: Identity) {
  switch (identity.provider) {
    case IdentityProvider.Discord:
      return `https://discord.com/users/${identity.providerId}`
    case IdentityProvider.GitHub:
      return `https://github.com/${(identity.profile as unknown as { username: string })?.username}`
    case IdentityProvider.Solana:
      return `https://explorer.solana.com/address/${identity.providerId}`
    case IdentityProvider.Twitter:
      return `https://twitter.com/${(identity.profile as unknown as { username: string })?.username}`
    default:
      return null
  }
}
