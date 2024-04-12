import { NetworkTokenType } from '../types/network-token-type'

export function getNetworkTokenTypeDescription(type: NetworkTokenType) {
  switch (type) {
    case NetworkTokenType.NonFungible:
      return 'This condition validates non-fungible asset ownership on Solana.'
    case NetworkTokenType.Fungible:
      return 'This condition validates fungible asset ownership on Solana.'
    case NetworkTokenType.Validator:
      return 'This condition validates the ownership of a gossip keypair on Solana.'
    default:
      return `Unknown condition type: ${type}`
  }
}
