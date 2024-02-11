import { IdentityProvider } from '@prisma/client'
import { Identity } from '../entity/identity.entity'

export function getIdentityUrl(identity: Identity) {
  switch (identity.provider) {
    case IdentityProvider.Discord:
      return `https://discord.com/users/${identity.providerId}`
    case IdentityProvider.Solana:
      return `https://solana.fm/address/${identity.providerId}`
    default:
      return null
  }
}
