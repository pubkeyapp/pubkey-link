import { MantineColor } from '@mantine/core'
import { NetworkTokenType } from '@pubkey-link/sdk'

export function getNetworkTokenTypeColor(type?: NetworkTokenType | null): MantineColor {
  switch (type) {
    case NetworkTokenType.NonFungible:
      return 'lime'
    case NetworkTokenType.Fungible:
      return 'indigo'
    case NetworkTokenType.Validator:
      return 'purple'
    default:
      return 'brand'
  }
}
