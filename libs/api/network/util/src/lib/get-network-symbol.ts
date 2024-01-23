import { NetworkType } from '@prisma/client'

export function getNetworkSymbol(type: NetworkType) {
  switch (type) {
    case NetworkType.Solana:
      return 'SOL'
    default:
      throw new Error(`Unknown network type: ${type}`)
  }
}
