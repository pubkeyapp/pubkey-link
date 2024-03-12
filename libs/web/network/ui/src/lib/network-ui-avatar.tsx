import { Avatar } from '@mantine/core'
import { Network } from '@pubkey-link/sdk'

import { getColorByIndex, getIntFromString, UiAvatarProps } from '@pubkey-ui/core'
import { IconCurrencySolana } from '@tabler/icons-react'

export type NetworkUiAvatarProps = UiAvatarProps & {
  network?: Network
}

export function NetworkUiAvatar({ network, ...props }: NetworkUiAvatarProps) {
  return (
    <Avatar radius="sm" color={getColorByIndex(getIntFromString(network?.name ?? ''))} {...props}>
      <IconCurrencySolana size={24} />
    </Avatar>
  )
}
