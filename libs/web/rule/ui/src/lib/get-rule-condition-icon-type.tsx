import { NetworkTokenType } from '@pubkey-link/sdk'
import { IconMoneybag, IconPhotoCircle } from '@tabler/icons-react'
import { ComponentType } from 'react'

export function getRuleConditionIconType(
  type?: NetworkTokenType | null,
): ComponentType<{ color?: string; size: number }> | undefined {
  switch (type) {
    case NetworkTokenType.NonFungible:
      return IconPhotoCircle
    case NetworkTokenType.Fungible:
      return IconMoneybag
    default:
      return undefined
  }
}
