import { NetworkTokenType } from '../types/network-token-type'

export function getNetworkTokenTypeTitle(type?: NetworkTokenType | null): string | undefined {
  switch (type) {
    case NetworkTokenType.NonFungible:
      return 'Non-Fungible Asset'
    case NetworkTokenType.Fungible:
      return 'Fungible Asset'
    case NetworkTokenType.Validator:
      return 'Validator'
    default:
      return `Unknown type: ${type}`
  }
}
