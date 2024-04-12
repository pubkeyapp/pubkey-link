import { NetworkTokenType } from '../types/network-token-type'

export function getNetworkTokenTypeColor(type?: NetworkTokenType | null): string | undefined {
  switch (type) {
    case NetworkTokenType.NonFungible:
      return 'lime'
    case NetworkTokenType.Fungible:
      return 'indigo'
    case NetworkTokenType.Validator:
      return 'grape'
    default:
      return undefined
  }
}
