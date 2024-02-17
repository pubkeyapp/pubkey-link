import { DasApiAsset } from '@metaplex-foundation/digital-asset-standard-api'
import { NetworkTokenType } from '@prisma/client'

export function getNetworkTokenType(int: DasApiAsset['interface'] | string) {
  switch (int) {
    case 'spl-token':
    case 'spl-token-2022':
    case 'FungibleAsset':
    case 'FungibleToken':
      return NetworkTokenType.Fungible
    case 'ProgrammableNFT':
    case 'V1_NFT':
    case 'V2_NFT':
      return NetworkTokenType.NonFungible
    default:
      throw new Error(`getNetworkTokenType: Unknown interface: ${int}`)
  }
}
