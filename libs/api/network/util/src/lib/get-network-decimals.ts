import { NetworkType } from '@prisma/client'

export function getNetworkDecimals(type: NetworkType) {
  switch (type) {
    case NetworkType.Solana:
      return 9
    default:
      throw new Error(`Unknown network type: ${type}`)
  }
}
