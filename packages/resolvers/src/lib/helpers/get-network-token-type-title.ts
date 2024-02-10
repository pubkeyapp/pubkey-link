import { NetworkTokenType } from '../types/network-token-type'

export function getNetworkTokenTypeTitle(type?: NetworkTokenType | null): string | undefined {
  switch (type) {
    case NetworkTokenType.NonFungible:
      return 'Non-Fungible Asset'
    case NetworkTokenType.Fungible:
      return 'Fungible Asset'
    default:
      return `Unknown type: ${type}`
  }
}
