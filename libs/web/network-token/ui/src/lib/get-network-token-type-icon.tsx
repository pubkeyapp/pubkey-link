import { NetworkTokenType } from '@pubkey-link/sdk'
import { IconListCheck, IconMoneybag, IconPhotoCircle } from '@tabler/icons-react'
import { ComponentType } from 'react'

export function getNetworkTokenTypeIcon(
  type?: NetworkTokenType | null,
): ComponentType<{ color?: string; size: number }> | undefined {
  switch (type) {
    case NetworkTokenType.NonFungible:
      return IconPhotoCircle
    case NetworkTokenType.Fungible:
      return IconMoneybag
    case NetworkTokenType.Validator:
      return IconListCheck
    default:
      return undefined
  }
}
